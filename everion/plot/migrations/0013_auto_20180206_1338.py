# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-06 07:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plot', '0012_reading_value_steps'),
    ]

    operations = [
        migrations.AddField(
            model_name='reading',
            name='fev1',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='reading',
            name='fvc',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='reading',
            name='pef',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='reading',
            name='ratio',
            field=models.FloatField(default=0),
        ),
    ]
