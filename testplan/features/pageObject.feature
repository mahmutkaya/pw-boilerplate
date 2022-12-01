@qa-automaiton-skynet
Feature: PageObject feature
  Background: Go to test page
    When I open the "testPage" page
    
  Scenario: I test API
    And I perform grapql query
    And I test interception

  Scenario: Perform: reload page
    When I reload the page

  Scenario: Perform: type in input and verify text contain in input
    When I store "some amazing text {{generate.timestamp}}" as "mySentence"
    And I type in "{{mySentence}}" in the element named "emailAddressInput"
    Then the element "emailAddressInput" should contain "{{mySentence}}"
    When I clear the input field "emailAddressInput"
    Then the element "emailAddressInput" should not contain "{{mySentence}}"

  Scenario: Perform: click on the element and verify text contain
    When I click on the element named "submitButton"
    Then the element "submitButton" should contain "Submit"
    And the element "submitButton" should not contain "Submit1"

  Scenario: Perform: verify disabled and enabled elements
    And the element "enabledElement" should be enabled
    And the element "disabledElement" should be disabled

  Scenario: Perform: store text from element
    When I store the text from "submitButton" element as "storedValue"
    And I log "test" "{{storedValue}}"
    Then the element "submitButton" should contain "{{storedValue}}"

  Scenario: Perform: select from dropdown
    When I select the isValueAttribute: "true" value "fr-apples" from the "select" dropdown select
    Then the element "select" should contain "apples"
    When I store "oranges" as "orangeFruit"
    And I select the isValueAttribute: "false" value "{{orangeFruit}}" from the "select" dropdown select
    Then the element "select" should contain "{{orangeFruit}}"

  Scenario: Perform: verify not existing element
    And the element "notExistingElement" should not exist

  Scenario: Perform: check & uncheck and verify checked & unchecked assertions
    When I check the checkbox "checkbox"
    Then the element "checkbox" should be checked
    When I uncheck the checkbox "checkbox"
    Then the element "checkbox" should not be checked

  Scenario: Perform: double click and verify visibility of elements
    Given the element "visibilityInputButton" should be visible
    And the element "visibilityInput" should not be visible
    When I double click on the element named "visibilityInputButton"
    And the element "visibilityInputButton" should be hidden
    Then the element "visibilityInput" should be visible

  Scenario: Verify getWrapper
    And the element "elementCss" should be visible
    And the element "elementXpath" should be visible
    And the element "elementExactTextMatch" should be visible
    And the element "elementPartialTextMatch" should be visible
