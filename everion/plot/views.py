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


def generate_dummies(request):
    fails = 0
    Reading.objects.all().delete()
    for patient in Patient.objects.all():
        start = dateutil.parser.parse(patient.last_update)
        end = datetime.datetime.now()
        current = start
        value_hr = 80
        while current <= end:
            value_hr = generate_hr(value_hr)
            current += datetime.timedelta(minutes=5)
            reading = Reading()
            reading.patient = patient
            reading.quality = 99
            reading.time = current
            reading.time_iso = current.isoformat()[:19]
            reading.time_epoch = 0
            reading.type = "hr"
            reading.value = value_hr
            try:
                reading.save()
            except:
                fails += 1

    return render(request, 'generate_dummies.html',
                  {"message": "number of readings: " + str(len(Reading.objects.all()))+
                   ", fails: " + str(fails)})
