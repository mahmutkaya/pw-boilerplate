@qa-automation-skynet
Feature: Generic steps verification
  Scenario: I wait for {int} seconds
    When I log "info" "hello Tom"
    And I wait for 10 seconds
    Then I log "info" "hello John"

  Scenario: I wait for {int} minutes
    When I log "info" "hello Tom"
    And I wait for 1 minutes
    Then I log "info" "hello John"

  Scenario: I wait for {int} milliseconds
    When I log "info" "hello Tom"
    And I wait for 3000 milliseconds
    Then I log "info" "hello John"

  Scenario: I store key with value
    When I store "Tom Hanks" as "actorName"
    And I log "info" "{{actorName}}"
    Then The string "{{actorName}}" will be equal to the string "Tom Hanks"

  Scenario: I store key with value - JSON example
    # INFO: cucumber auto complete can warn with missing step if we use singel '' - but it will work
    # INFO: It is hard to compare more complex objects currently
    When I store '{\"payload\":{\"id\":\"HBNH989\",\"availableBalance\":100}}' as 'detail'
    And I log "info" "{{detail}}"

  Scenario: I store key with value - object
    When I store "{ a: 'apple' }" as "fruit"
    And I log "info" "{{fruit}}"
    Then The string "{{fruit}}" will be equal to the string "{ a: 'apple' }"

  Scenario: We calculate operation and store as key
    When I calculate "(2+2-10+40)*4/2-10" and store it in "sum"
    And I log "info" "{{sum}}"
    Then The number "{{sum}}" will be equal to the number "58"

  Scenario: Add fixture file to testobject
    When I import fixture file "projects/qa-automation-skyduck/fixtures/apiTest.json" as "fileContent"
    Then The string "{{fileContent.data.grant_type}}" will be equal to the string "client_credentials"
