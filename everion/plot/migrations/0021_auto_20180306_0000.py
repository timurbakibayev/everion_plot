# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-03-05 18:00
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plot', '0020_auto_20180301_1322'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='apilog',
            options={'ordering': ['-date']},
        ),
        migrations.AlterModelOptions(
            name='patient',
            options={'ordering': ['-id']},
        ),
    ]
