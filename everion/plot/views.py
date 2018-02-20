from django.shortcuts import render
from plot.models import *
import dateutil.parser
import datetime
import pytz
import random
import requests
import json
import time
tz = pytz.timezone('Asia/Almaty')
# Create your views here.
def plotter(request):
    return render(request, 'plot.html', {})

def automate(request):
    return render(request, 'automate.html', {})


def index(request):
    return render(request, 'index.html', {})

def generate_hr(prev):
    if prev < 90:
        delta = random.randint(-4,9)
    else:
        delta = random.randint(-9,4)
    return prev + delta

def generate_spo2(prev):
    if prev < 98:
        delta = random.randint(-1,2)
    else:
        delta = random.randint(-2,1)
    if prev <= 95:
        delta = 1
    if prev >= 99:
        delta = -1
    return prev + delta

def generate_activity(prev):
    if prev < 0.78:
        delta = random.choice([-0.2, -0.1, 0.2, 0.3, 0.4, 1])
    else:
        delta = random.choice([-1, -0.4, -0.3, -0.2, 0, 0.1, 0.2])
    if prev + delta < 0:
        return 0
    if prev >= 6:
        delta = -1;
    return prev + delta

def generate_bperf(prev):
    if prev < 0.35:
        delta = random.choice([-0.05, -0.01, 0.02, 0.03, 0.04])
    else:
        delta = random.choice([-0.04, -0.03, -0.02, 0, 0.01, 0.05])
    if prev + delta < 0:
        return 0
    if prev >= 0.8:
        delta = -0.04;
    return prev + delta

def generate_rr(prev):
    if prev < 18:
        delta = random.randint(-1,3)
    else:
        delta = random.randint(-3,1)
    if prev < 8:
        return 8
    if prev > 19:
        return 19
    return prev + delta

def generate_hrv(prev):
    if prev < 20:
        delta = random.randint(-2,6)
    else:
        delta = random.randint(-6,2)
    if prev < 12:
        return 12
    if prev > 42:
        return 42
    return prev + delta

def web_put(request,id,date,time):
    print(id,date,time)
    if len(time) == 5:
        time += ":00"
    try:
        patient = Patient.objects.get(pk=id)
        user = request.user
        # if user is None:
        #    return Response({"detail": "Необходима авторизация"})
    except:
        return render(request, 'generate_dummies.html',
                  {"message":'no such patient'})
    readings = Reading.objects.filter(patient=patient)
    try:
        reading = readings.get(time_iso=date+"T"+time)
    except:
        reading = Reading()
    what_i_did = ""
    if "ratio" in request.GET:
        what_i_did += "......... Trying to set ratio to " + request.GET["ratio"]
        reading.value_ratio = float(request.GET["ratio"])
        reading.save()
    if "fvc" in request.GET:
        what_i_did += "......... Trying to set fvc to " + request.GET["fvc"]
        reading.value_fvc = float(request.GET["fvc"])
        reading.save()
    if "fev1" in request.GET:
        what_i_did += "......... Trying to set fev1 to " + request.GET["fvc"]
        reading.value_fev1 = float(request.GET["fev1"])
        reading.save()
    if "fvc_predicted" in request.GET:
        what_i_did += "......... Trying to set fvc_predicted to " + request.GET["fvc_predicted"]
        reading.value_fvc_predicted = float(request.GET["fvc_predicted"])
        reading.save()
    if "fev1_predicted" in request.GET:
        what_i_did += "......... Trying to set fev1_predicted to " + request.GET["fev1_predicted"]
        reading.value_fev1_predicted = float(request.GET["fev1_predicted"])
        reading.save()
    return render(request, 'generate_dummies.html',
                  {"message": "id: " + id + " datetime: " + date+"T"+time + what_i_did})

def generate_dummies(request):
    fails = 0
    #Reading.objects.all().delete()
    for patient in Patient.objects.all():
        if patient.dummy:
            start = dateutil.parser.parse(patient.last_update)
            end = datetime.datetime.now()
            current = start
            value_hr = 80
            value_spo2 = 96 # 93 - 99
            value_activity = 0.78 # 0.2 - 6
            value_bperf = 0.35 #+- 0.5
            value_rr = 18 #+- 10
            value_hrv = 20 #12 - 42
            cc = 0
            while current <= end:
                value_hr = generate_hr(value_hr)
                value_spo2 = generate_spo2(value_spo2)
                value_activity = generate_activity(value_activity)
                value_bperf = generate_bperf(value_bperf)
                value_rr = generate_rr(value_rr)
                value_hrv = generate_hrv(value_hrv)
                current += datetime.timedelta(minutes=5)
                reading = Reading()
                reading.patient = patient
                reading.time = tz.localize(current)
                reading.time_iso = current.isoformat()[:19]
                reading.time_epoch = 0
                reading.value_hr = value_hr
                reading.value_spo2 = value_spo2
                reading.value_activity = value_activity
                reading.value_bperf = value_bperf
                reading.value_rr = value_rr
                reading.value_hrv = value_hrv
                try:
                    reading.save()
                    cc += 1
                except:
                    fails += 1
            if cc > 0:
                patient.last_update = current.isoformat()[:19]
                patient.save()
                return render(request, 'generate_dummies.html',
                          {"message": "Added to " + patient.name + ", number of readings: " + str(len(Reading.objects.all()))+
                           ", fails: " + str(fails)})
    return render(request, 'generate_dummies.html',
                  {"message": "Did not add anything, all patients have data, number of readings: " + str(len(Reading.objects.all())) +
                              ", fails: " + str(fails)})


def read_from_api(request):
    url_login = "https://devcloudapi.biovotion.com/login"
    url_users = "https://devcloudapi.biovotion.com/v1/orgs/apmkz-01/users"
    url_datasources = "https://devcloudapi.biovotion.com/v1/orgs/apmkz-01/users/{userId}/datasources/vs"
    cred = '{"user":"timurbakibayev@gmail.com",' + \
           '"password":"mkoda5918",' + \
           '"provider":"apmkz-01"}'
    headers = {"Content-Type": "application/json"}
    print("trying to login")
    try:
        login = requests.post(url_login, data=cred, headers=headers, timeout=3)
    except:
        return render(request, 'generate_dummies.html',
                      {"message": "Failed to login, api not available :("})
    print("login response:")
    print(login)
    print()
    if not "LOGIN_OK" in login.text:
        return render(request, 'generate_dummies.html',
                      {"message": "We have a problem with login: " + login.text})
    fails = 0
    print("trying to fetch users")
    users_req = requests.get(url_users, headers=headers, cookies=login.cookies)
    print("result:")
    print(users_req)
    print("users:")
    users = users_req.json()

    how_many_at_once = 0

    for patient in Patient.objects.all():
        # here we will make a request for each patient
        for user in users:
            if user["mobile"] == patient.phone_no:
                user_id = user["_id"]
                print("trying to fetch events for", user["mobile"], ", id ==", user_id)
                user_url = url_datasources.replace("{userId}", user_id)
                user_url += "?from=" + str(patient.last_update_epoch + 10) # 1518710000
                to_epoch = min(int(datetime.datetime.timestamp(datetime.datetime.now())),
                               patient.last_update_epoch + 5000)
                user_url += "&to=" + str(to_epoch)
                print(user_url)
                ds = requests.get(user_url, headers=headers, cookies=login.cookies)
                readings = Reading.objects.filter(patient=patient)
                cache = {}
                # print(ds.json())
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
                                print("another exception:",e)
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
                            return render(request, 'generate_dummies.html',
                                          {"message": "Successfully imported 1000 records, stopped on " +
                                                      user["name"]["first"] + " " + user["name"]["last"]})
                        if how_many_at_once < 30:
                            print("saved:", line["original_timestamp"], line)
                    except Exception as e:
                        print("failed to save", line)
                        print(e)
                patient.save()

    return render(request, 'generate_dummies.html',
                  {"message": "Job is complete. Imported: " + str(how_many_at_once) + " records."})