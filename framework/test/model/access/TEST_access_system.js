//////////////// test ////////////////
{
conDB = new DatabaseToFrom();
// conDB.insertIntoDB(['users', ['accountName', 0, 'ok', '', '']]);
// _testAccount0 = new Account("0", "ok");

console.log("TEST_access_system.js");
NyanTest.assertEquals(_testAccount0.getProfile().getName(), "accountName");
}