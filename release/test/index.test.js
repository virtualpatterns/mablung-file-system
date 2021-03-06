import Test from 'ava';

Test.before(async test => {
  test.context.index = await import('../index.js');
});

[
'FileSystem'].
forEach(name => {

  Test(name, async test => {
    test.truthy(test.context.index[name]);
  });

});
//# sourceMappingURL=index.test.js.map