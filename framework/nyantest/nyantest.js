class NyanTest {
    static #testCount = 0;
    
    static assertEquals( _actual, _expected ) {
        if( _actual === _expected ) console.log("Test " + NyanTest.#testCount + " successful.");
        else console.log("Test " + NyanTest.#testCount + " failed:\n    expected: " + _expected + "\n    actual: " + _actual);
        NyanTest.#testCount ++;
    }
    static assertTrue( _actual ) {
        if( _actual ) console.log("Test " + NyanTest.#testCount + " successful.");
        else console.log("Test " + NyanTest.#testCount + " failed:\n    expected: true\n    actual: " + _actual);
        NyanTest.#testCount ++;
    }
    static assertFalse( _actual ) {
        if( !_actual ) console.log("Test " + NyanTest.#testCount + " successful.");
        else console.log("Test " + NyanTest.#testCount + " failed:\n    expected: false\n    actual: " + _actual);
        NyanTest.#testCount ++;
    }
}