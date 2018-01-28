from rest_framework import serializers
from plot.models import Patient
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
