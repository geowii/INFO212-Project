//////////////// test ////////////////
{
_testAccount0 = new Account("accountName", "ok");

console.log("TEST_access_system.js");
NyanTest.assertEquals(_testAccount0.getProfile().getName(), "accountName");
}