from django.shortcuts import render
from plot.models import *
import dateutil.parser
import datetime
import pytz
import random
tz = pytz.timezone('Asia/Almaty')
# Create your views here.
def plotter(request):
    return render(request, 'plot.html', {})


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

def generate_dummies(request):
    fails = 0
    Reading.objects.all().delete()
    for patient in Patient.objects.all():
        start = dateutil.parser.parse(patient.last_update)
        end = datetime.datetime.now()
        current = start
        value_hr = 80
        value_spo2 = 96 # 93 - 99
        value_activity = 0.78 # 0.2 - 6
        value_bperf = 0.35 #+- 0.5
        value_rr = 18 #+- 10
        value_hrv = 20 #12 - 42
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
            reading.time = current
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
            except:
                fails += 1
        print("Done with patient", patient.id)
    return render(request, 'generate_dummies.html',
                  {"message": "number of readings: " + str(len(Reading.objects.all()))+
                   ", fails: " + str(fails)})
