# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-03-01 07:22
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plot', '0017_apilog'),
    ]

    operations = [
        migrations.RenameField(
            model_name='apilog',
            old_name='date',
            new_name='datetime',
        ),
    ]
