# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-06 07:46
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plot', '0013_auto_20180206_1338'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='biovotion',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='nuvoair',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
    ]