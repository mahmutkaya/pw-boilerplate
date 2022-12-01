@qa-automation-skynet
Feature: Logging Feature - Verify implementation of "I log" step
  Scenario: Error option
    Given I log "error" "print error"
    And I log "error" "print generate.timestamp {{generate.timestamp}}"
    And I log "error" "{{generate.timestamp}}"

  Scenario: Warn option
    Given I log "warn" "print warn"
    And I log "warn" "print generate.timestamp {{generate.timestamp}}"
    And I log "warn" "{{generate.timestamp}}"

  Scenario: Test option
    Given I log "test" "print test"
    And I log "test" "print generate.timestamp {{generate.timestamp}}"
    And I log "test" "{{generate.timestamp}}"

  Scenario: Info option
    Given I log "info" "print info"
    And I log "info" "print generate.timestamp {{generate.timestamp}}"
    And I log "info" "{{generate.timestamp}}"

  Scenario: Debug option
    # INFO: This option will only work with level: "DEBUG"
    Given I log "debug" "print debug"
    And I log "debug" "print generate.timestamp {{generate.timestamp}}"
    And I log "debug" "{{generate.timestamp}}"
