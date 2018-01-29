from rest_framework import serializers
from plot.models import Patient
from plot.models import Reading
from django.contrib.auth.models import Group
from django.contrib.auth.models import User
from bs4 import BeautifulSoup
import requests

class PatientSerializer(serializers.ModelSerializer):
    #caption = serializers.SerializerMethodField("in_caption")

    #def in_caption(self, field):
    #    return str(field.field_name)

    class Meta:
        model = Patient
        fields = ('id', 'name', 'birthday')


class ReadingSerializer(serializers.ModelSerializer):
    #caption = serializers.SerializerMethodField("in_caption")

    #def in_caption(self, field):
    #    return str(field.field_name)

    class Meta:
        model = Reading
        fields = ('time_epoch','time','time_iso', 'value_hr', 'value_spo2', 'value_activity',
                  'value_bperf', 'value_rr', 'value_hrv')
