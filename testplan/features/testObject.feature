@qa-automation-skynet
Feature: TestObject feature
  Scenario: Add key value to testObject - normal value
    When I store "this is my value" as "storedValue"
    And I log "test" "{{storedValue}}"
    Then The string "{{storedValue}}" will be equal to the string "this is my value"

  Scenario: Add key value to testObject - generated value
    When I store "{{generate.timestamp}}" as "storedValue"
    And I store "{{storedValue}}" as "expectedValue"
    And I log "test" "{{storedValue}}"
    And I log "test" "{{expectedValue}}"
    Then The string "{{storedValue}}" will be equal to the string "{{expectedValue}}"

  Scenario: Add key value to testObject - generated key value
    When I store "storedValue" as "{{generate.timestamp}}"
    And I log "test" "search test object for generated timestamp value"
    Then I log "test" "{{}}"

  Scenario: Add nested value to testObject - normal value
    When I store "storedValue" as "nested.value"
    And I log "test" "{{nested}}"
    Then The string "{{nested.value}}" will be equal to the string "storedValue"

  Scenario: Add nested value to testObject - normal value
    When I store "{{generate.timestamp}}" as "nested.value"
    And I store "{{nested.value}}" as "expectedValue"
    And I log "test" "{{nested.value}}"
    And I log "test" "{{expectedValue}}"
    Then The string "{{nested.value}}" will be equal to the string "{{expectedValue}}"

  Scenario: Add key value to testObject - generated key value
    When I store "valueOfTimeStamp" as "nested.value{{generate.timestamp}}"
    And I log "test" "search test object for nested generated timestamp value"
    Then I log "test" "{{nested}}"

# TODO: Add scenario for nested.value.11647262770326 = {}
# Example: "nested.value.{{generate.timestamp}}"
