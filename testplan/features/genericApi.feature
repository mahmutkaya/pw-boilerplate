@qa-automation-skynet
Feature: Generic API feature
  Scenario: Create API object using fixture file
    When  I prepare an API test object called "myObject" using fixture file "./src/projects/qa-automation-skynet/fixtures/apiTest.json"
    Then The string "{{myObject.requestConfig.data.grant_type}}" will be equal to the string "client_credentials"

  Scenario: Add header to request
    Given  I prepare an API test object called "caller" using fixture file "./src/projects/qa-automation-skynet/fixtures/apiTest.json"
    When I add the headers '{\"x-api-key\":\"invalid-api-key-that-is-totally-made-up\"}' to the test object "caller"
    And I add the headers '{\"secondHeader\": \"second\"}' to the test object "caller"
    Then The string "{{caller.requestConfig.headers.x-api-key}}" will be equal to the string "invalid-api-key-that-is-totally-made-up"
    And The string "{{caller.requestConfig.headers.secondHeader}}" will be equal to the string "second"

  Scenario: Add basic authentication to request
    Given  I prepare an API test object called "caller" using fixture file "./src/projects/qa-automation-skynet/fixtures/apiTest.json"
    When I add basic authentication username: "{{ secrets.customer-salesforce-service.username }}" and password: "{{ secrets.customer-salesforce-service.password }}" to the test object "caller"
    Then The string "{{caller.requestConfig.auth.username}}" will contain the string "atbank"
    And The string "{{caller.requestConfig.auth.password}}" will contain the string "p3ycD"

  Scenario: Add form data to request
    Given  I prepare an API test object called "caller" using fixture file "./src/projects/qa-automation-skynet/fixtures/apiTest.json"
    When I add the form data '{ \"grant_type\": \"form_authorization\" }' to the test object "caller"
    And I add the form data '{ \"second_data\": \"second\" }' to the test object "caller"
    Then The string "{{caller.requestConfig.data.grant_type}}" will be equal to the string "form_authorization"
    And The string "{{caller.requestConfig.data.second_data}}" will be equal to the string "second"

  Scenario: Add content data to test object
    Given I store "QaSkyducktUser" as "username"
    And I store "TestLead" as "jobTitle"
    And  I prepare an API test object called "caller" using fixture file "./src/projects/qa-automation-skynet/fixtures/apiTest.json"
    When I add the content data "./src/projects/qa-automation-skynet/fixtures/apiData.json" to the test object "caller"
    And I add the content data '{\"secondKey\": \"second\"}' to the test object "caller"
    Then The string "{{caller.requestConfig.data.userData.job}}" will be equal to the string "TestLead"
    And The string "{{caller.requestConfig.data.secondKey}}" will be equal to the string "second"

  Scenario: Send POST request and check response status
    Given I store "QaSkyducktUser" as "username"
    And I store "TestLead" as "jobTitle"
    And I prepare an API test object called "apiObject" using fixture file "./src/projects/qa-automation-skynet/fixtures/apiData.json"
    When I perform a POST to "{{qa-automation-skynet.config.baseurl}}{{qa-automation-skynet.config.endpoints.postGet}}" using "apiObject"
    Then the status code for "apiObject" will be equal to "201"

  Scenario: Send GET and check content of response and value for specific data
    Given I store "QaSkyducktUse1r" as "username"
    And I store "TestLead2" as "jobTitle"
    And I prepare an API test object called "apiObject" using fixture file "./src/projects/qa-automation-skynet/fixtures/apiData.json"
    When I perform a GET to "{{qa-automation-skynet.config.baseurl}}{{qa-automation-skynet.config.endpoints.postGet}}/2" using "apiObject"
    Then the content for "apiObject" will be equal to '{\"data\": { \"id\": 2, \"email\": \"janet.weaver@reqres.in\", \"first_name\": \"Janet\", \"last_name\": \"Weaver\" , \"avatar\": \"https://reqres.in/img/faces/2-image.jpg\"} , \"support\": {\"url\": \"https://reqres.in/#support-heading\" , \"text\": \"To keep ReqRes free, contributions towards server costs are appreciated!\"}}'
    And The string "{{apiObject.response.data.data.id}}" will be equal to the string "2"
