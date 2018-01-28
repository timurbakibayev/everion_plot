from django.db import models

# Create your models here.
class Patient(models.Model):
    name = models.CharField(max_length=200)
    birthday = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Reading(models.Model):
    patient = models.ForeignKey(Patient)
    type = models.CharField(max_length=30)
    timestamp = models.IntegerField()
    time = models.DateTimeField()
    value = models.FloatField()
    quality = models.IntegerField()

    def __str__(self):
        return self.type + ": " + str(self.value)

