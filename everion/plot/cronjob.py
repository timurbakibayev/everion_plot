from plot.models import *
import dateutil.parser
import datetime
import pytz
import random
import requests
import json
import time
tz = pytz.timezone('Asia/Almaty')

def log(desc):
    apiLog = ApiLog()
    apiLog.description = desc
    apiLog.save()

def run_job():
    url_login = "https://devcloudapi.biovotion.com/login"
    url_users = "https://devcloudapi.biovotion.com/v1/orgs/apmkz-01/users"
    url_datasources = "https://devcloudapi.biovotion.com/v1/orgs/apmkz-01/users/{userId}/datasources/vs"
    cred = '{"user":"timurbakibayev@gmail.com",' + \
           '"password":"mkoda5918",' + \
           '"provider":"apmkz-01"}'
    headers = {"Content-Type": "application/json"}
    while True:
        log("trying to login")
        try:
            login = requests.post(url_login, data=cred, headers=headers, timeout=3)
            log("login response:")
            log(login)
            log("")
            if not "LOGIN_OK" in login.text:
                log("We have a problem with login: " + login.text)
            else:
                fails = 0
                log("trying to fetch users")
                users_req = requests.get(url_users, headers=headers, cookies=login.cookies)
                log("result:")
                log(users_req)
                log("users:")
                users = users_req.json()
                how_many_at_once = 0
                for patient in Patient.objects.all():
                    # here we will make a request for each patient
                    for user in users:
                        if user["mobile"] == patient.phone_no:
                            user_id = user["_id"]
                            log("trying to fetch events for" + user["mobile"] + ", id ==" + str(user_id))
                            user_url = url_datasources.replace("{userId}", user_id)
                            user_url += "?from=" + str(patient.last_update_epoch + 10) # 1518710000
                            to_epoch = min(int(datetime.datetime.timestamp(datetime.datetime.now())),
                                           patient.last_update_epoch + 5000)
                            user_url += "&to=" + str(to_epoch)
                            log(user_url)
                            ds = requests.get(user_url, headers=headers, cookies=login.cookies)
                            readings = Reading.objects.filter(patient=patient)
                            cache = {}
                            log(str(ds.json())[:1000])
                            for data in ds.json():
                                measurement_type = data['c_measurement_type']
                                cumulative = 0
                                for value in data['c_arrayvalue']:
                                    try:
                                        counter, timestamp, value, quality = value['c_value']
                                        counter = int(counter)
                                        original_timestamp = timestamp
                                        timestamp = int(timestamp) + 6 * 60 * 60
                                        value = float(value)
                                        quality = float(quality)
                                        timestamp_iso = time.strftime('%Y-%m-%dT%H:%M:%S', time.localtime(timestamp))
                                        time_dt = tz.localize(dateutil.parser.parse(timestamp_iso))
                                        if timestamp_iso[-1:] == "0":
                                            if timestamp_iso not in cache:
                                                cache[timestamp_iso] = {}
                                            if measurement_type in ["hr","spo2","rr","hrv"]:
                                                cache[timestamp_iso][measurement_type] = int(value)
                                            elif measurement_type == "bperf":
                                                cache[timestamp_iso][measurement_type] = value
                                            elif measurement_type == "activity":
                                                cache[timestamp_iso][measurement_type] = value + cumulative
                                            elif measurement_type == "steps":
                                                cache[timestamp_iso][measurement_type] = int(value + cumulative)
                                            cumulative = 0
                                            cache[timestamp_iso]["original_timestamp"] = original_timestamp
                                            cache[timestamp_iso]["time_iso"] = timestamp_iso
                                            cache[timestamp_iso]["time_epoch"] = timestamp
                                            cache[timestamp_iso]["time"] = time_dt
                                        else:
                                            cumulative += value
                                    except Exception as e:
                                        if "not enough values" not in str(e):
                                            log("another exception:" + str(e))
                            for key in cache:
                                line = cache[key]
                                try:
                                    reading = Reading()
                                    reading.patient_id = patient.id
                                    reading.time_iso = line["time_iso"]
                                    reading.time_epoch = line["time_epoch"]
                                    reading.time = line["time"]
                                    if "hr" in line:
                                        reading.value_hr = line["hr"]
                                    if "hrv" in line:
                                        reading.value_hrv = line["hrv"]
                                    if "spo2" in line:
                                        reading.value_spo2 = line["spo2"]
                                    if "rr" in line:
                                        reading.value_rr = line["rr"]
                                    if "bperf" in line:
                                        reading.value_bperf = line["bperf"]
                                    if "activity" in line:
                                        reading.value_activity = line["activity"]
                                    if "steps" in line:
                                        reading.value_steps = line["steps"]
                                    reading.save()
                                    if line["original_timestamp"] > patient.last_update_epoch:
                                        patient.last_update = line["time_iso"]
                                        patient.last_update_epoch = line["original_timestamp"]
                                    how_many_at_once += 1
                                    if how_many_at_once > 1000:
                                        patient.save()
                                        log("Successfully imported 1000 records, stopped on " + user["name"]["first"] + " " + user["name"]["last"])
                                        continue
                                except Exception as e:
                                    log("failed to save" + str(line))
                                    log(e)
                            patient.save()
        except Exception as e:
            log("Error: " + str(e))
        time.sleep(40)

run_job()