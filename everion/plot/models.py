from django.db import models
from django.utils.timezone import now as timezone_now
import os

# Create your models here.
class Patient(models.Model):
    name = models.CharField(max_length=200)
    birthday = models.DateField(null=True, blank=True)
    last_update = models.CharField(max_length=19, default="2018-01-20T01:00:00")
    last_update_epoch = models.IntegerField(default=0)
    phone_no = models.CharField(max_length=12, default="+7")
    dummy = models.BooleanField(default=False)
    limits_hr_min = models.FloatField(default=70)
    limits_hr_max = models.FloatField(default=110)
    limits_spo2_min = models.FloatField(default=94)
    limits_spo2_max = models.FloatField(default=100)
    limits_bperf_min = models.FloatField(default=0.1)
    limits_bperf_max = models.FloatField(default=0.75)
    limits_rr_min = models.FloatField(default=10)
    limits_rr_max = models.FloatField(default=50)

    def __str__(self):
        return self.name


class Reading(models.Model):
    patient = models.ForeignKey(Patient)
    time_epoch = models.IntegerField()
    time_iso = models.CharField(max_length=19, default="2018-01-01T01:00:00")
    time = models.DateTimeField()
    value_hr = models.IntegerField(default=0)
    value_spo2 = models.IntegerField(default=0)
    value_activity = models.FloatField(default=0)
    value_steps = models.IntegerField(default=0)
    value_bperf = models.FloatField(default=0)
    value_rr = models.IntegerField(default=0)
    value_hrv = models.IntegerField(default=0)
    value_fvc = models.FloatField(default=0)
    value_fvc_predicted = models.IntegerField(default=0)
    value_fev1 = models.FloatField(default=0)
    value_fev1_predicted = models.IntegerField(default=0)
    value_ratio = models.FloatField(default=0)
    value_ratio_predicted = models.IntegerField(default=0)
    value_pef = models.FloatField(default=0)
    value_duration = models.FloatField(default=0)

    def __str__(self):
        return str(self.value_hr) + ": " + str(self.value_hrv)


def upload_to(instance, filename):
    now = timezone_now()
    filename_base, filename_ext = os.path.splitext(filename)
    return 'my_uploads/{}_{}{}'.format(
        now.strftime("%Y_%m_%d/%H%M%S"),
        filename_base,
        filename_ext.lower()
    )


class Attachment(models.Model):
    parent_id = models.CharField(max_length=18)
    file_name = models.CharField(max_length=255)
    attachment = models.FileField(upload_to=upload_to)
    user_id = models.IntegerField(default=-1)

    def __str__(self):
        return self.file_name

    class Meta:
        ordering = ["-file_name"]


class ApiLog(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=2000)

    def __str__(self):
        return self.description

    class Meta:
        ordering = ["-date"]
