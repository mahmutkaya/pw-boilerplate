@qa-automation-skynet
Feature: Generic assertions verification
  Scenario: I check if {stringA} is equal to {stringB}
    When I store "foo" as "storedString"
    Then The string "{{storedString}}" will be equal to the string "foo"

  Scenario: Compare two numbers
    When I store "10.1" as "storedNumber"
    Then The number "{{storedNumber}}" will be equal to the number "10.1"

  Scenario: Check if string contains other string
    When I store "Skyduck is a new version of Skynet" as "storedSentece"
    Then The string "{{storedSentece}}" will contain the string "Skynet"
