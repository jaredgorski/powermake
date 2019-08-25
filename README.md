# powermake
Utility for automating macros depending on conditions

## Description
powermake executes a user-defined macro which runs a process or series of processes and sets up monitors to identify specific conditions which, when encountered, trigger new actions. This user-defined macro, called a *profile*, defines the processes to be run, monitors to be set, and actions to be triggered. This enables a user to schedule dependent processes, automate the management of a development environment, suppress annoying logs, trigger notifications, and more.

## Synopsis
```shell
pm make [-p PROFILE]
pm setup [OPTION] [PROFILE | CONFIG]  # under construction
```
