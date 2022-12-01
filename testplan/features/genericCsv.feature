@qa-automation-skynet
Feature: Generic CSV steps verification
  Scenario: I read the csv file {string} and save as {string}
    When I read the csv file "qa-automation-skyduck/fixtures/test.csv" and save as "testCsv"
    And I log "info" "{{testCsv}}"
    Then The string "{{testCsv[1].col1}}" will be equal to the string "row21"
