# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-01 08:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plot', '0008_auto_20180201_0353'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='dummy',
            field=models.BooleanField(default=False),
        ),
    ]
