from rest_framework import serializers
from plot.models import Patient
from plot.models import Reading
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from bs4 import BeautifulSoup
import requests


class PatientSerializer(serializers.ModelSerializer):
    thumbnail = serializers.SerializerMethodField("in_thumbnail")

    def in_thumbnail(self, patient):
        readings = Reading.objects.filter(patient_id=patient.id).order_by('-time_iso')
        skip = len(readings) // 50
        i = 0
        t = ""
        for reading in readings:
            i += 1
            if skip == 0 or i % skip == 0:
                if len(t) > 0:
                    t += ","
                t += str(reading.value_hr)
        return t

    class Meta:
        model = Patient
        fields = ('id', 'name', 'birthday', 'thumbnail',
                  'limits_hr_min', 'limits_hr_max',
                  'limits_spo2_min', 'limits_spo2_max',
                  'limits_bperf_min', 'limits_bperf_max',
                  'limits_rr_min', 'limits_rr_max',
                  )


class ReadingSerializer(serializers.ModelSerializer):
    # caption = serializers.SerializerMethodField("in_caption")
    # sum_steps = serializers.SerializerMethodField("in_steps")
    #
    # def in_steps(self, reading):
    #    return str(reading.field_name)

    class Meta:
        model = Reading
        fields = ('time_epoch', 'time', 'time_iso',
                  'value_hr', 'value_spo2', 'value_activity', 'value_steps',
                  'value_bperf', 'value_rr', 'value_hrv',
                  )
