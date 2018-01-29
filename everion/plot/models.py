from django.db import models

# Create your models here.
class Patient(models.Model):
    name = models.CharField(max_length=200)
    birthday = models.DateField(null=True, blank=True)
    last_update = models.CharField(max_length=19, default="2018-01-20T01:00:00")

    def __str__(self):
        return self.name


class Reading(models.Model):
    patient = models.ForeignKey(Patient)
    time_epoch = models.IntegerField()
    time_iso = models.CharField(max_length=19, default="2018-01-01T01:00:00")
    time = models.DateTimeField()
    value_hr = models.IntegerField(default=80)
    value_spo2 = models.IntegerField(default=99)
    value_activity = models.FloatField(default=0.78)
    value_bperf = models.FloatField(default=0.35)
    value_rr = models.IntegerField(default=18)
    value_hrv = models.IntegerField(default=20)

    def __str__(self):
        return self.type + ": " + str(self.value)

