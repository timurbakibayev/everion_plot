from django.core.management.base import BaseCommand, CommandError
import socket
import sys

from plot import cronjob
from plot.models import *

lock_socket = None  # we want to keep the socket open until the very end of
                    # our script so we use a global variable to avoid going
                    # out of scope and being garbage-collected

def is_lock_free():
    global lock_socket
    try:
        lock_socket = socket.socket(socket.AF_UNIX, socket.SOCK_DGRAM)
    except:
        print("Running on windows, no control")
        return True
    try:
        lock_id = "timurbakibayev.api_everion"   # this should be unique. using your username as a prefix is a convention
        lock_socket.bind('\0' + lock_id)
        print("Acquired lock {}".format(lock_id))
        return True
    except socket.error:
        # socket already locked, task must already be running
        print("Failed to acquire lock {}".format(lock_id))
        return False


class Command(BaseCommand):
    def handle(self, *args, **options):
        print("Trying to run. You have {} patients".format(len(Patient.objects.all())))
        if not is_lock_free():
            sys.exit()

        cronjob.run_job()
