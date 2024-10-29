# companion-module-shure-mxn5
See HELP.MD for more information about this module.

# Version History

## v2.1.0 (2024-10-29)
- Feature: Add variables for gain of individual channels
- Bugfix: fix handling of gain values, was affecting setting gain below 0 or lowering gain

## v2.0.0 (2024-05-23)
- Major: Update for compatibility with Companion 3.x
- Feature: Upgrade legacy feedbacks to boolean feedback
- Feature: Add action for setting channel gain
- Feature: consolidating increment and decrement gain actions to one action by adding an option for value of gain increment
- Feature: Add actions for controlling LED indicator
- Feature: Add actions for controlling signal generator
- Feature: Add feedback for active preset
- Bugfix: fix variables for channel mutes
- Bugfix: do reconnect when changing IP or port of the connection

## v1.0.1 (2022-02-02)
- Bugfix: replace calls to system

## v1.0.0 (2021-11-30)
- Initial release