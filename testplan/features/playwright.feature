@foo @remove
Feature: Playwright docs
  Background: Navigation
    Given Go to the playwright website

  Scenario: This is not skipped - Change theme
    Given A bored activity is recieved
    When Change theme to "light" mode
    # And Screen matches the base image "Light Mode"
    Then We see "light" mode
    When Change theme to "dark" mode
    # And Screen matches the base image "Dark Mode"
