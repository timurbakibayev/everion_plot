from django.db import models

# Create your models here.
class Patient(models.Model):
    name = models.CharField(max_length=200)
    birthday = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name

