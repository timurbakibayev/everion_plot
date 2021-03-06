# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-03 18:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plot', '0010_attachment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reading',
            name='value_activity',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='reading',
            name='value_bperf',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='reading',
            name='value_hr',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='reading',
            name='value_hrv',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='reading',
            name='value_rr',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='reading',
            name='value_spo2',
            field=models.IntegerField(default=0),
        ),
    ]
