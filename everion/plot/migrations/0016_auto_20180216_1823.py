# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2018-02-16 12:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plot', '0015_merge_20180216_1822'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='biovotion',
        ),
        migrations.RemoveField(
            model_name='patient',
            name='nuvoair',
        ),
        migrations.RemoveField(
            model_name='reading',
            name='fev1',
        ),
        migrations.RemoveField(
            model_name='reading',
            name='fvc',
        ),
        migrations.RemoveField(
            model_name='reading',
            name='pef',
        ),
        migrations.RemoveField(
            model_name='reading',
            name='ratio',
        ),
        migrations.AddField(
            model_name='patient',
            name='last_update_epoch',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='patient',
            name='phone_no',
            field=models.CharField(default='+7', max_length=12),
        ),
    ]
