module('IcMenuListComponent', {
  setup: function() {
    App.reset();
  }
});

test('focus trigger on escape key close', function() {
  click('#trigger1').then(function() {
    return keyEvent('#list1', 'keydown', 27);
  }).then(function() {
    ok(find('#list1').is(':hidden'), 'list is hidden on escape');
    ok(find('#trigger1').is(':focus'), 'trigger get focus on list close');
  });
});

test('focuses first item on open', function() {
  click('#trigger1').then(function() {
    ok(find('#list1').is(':visible'), 'list is visible');
  }).then(function() {
    assertSelected(':first', 'selects first element by default');
  });
});

test('up selects previous', function() {
  click('#trigger1').then(function() {
    // at first element
    return keyEvent('#list1', 'keydown', 40);
  }).then(function() {
    // at second/last element
    assertSelected(':last', 'selects next element with down arrow');
    return keyEvent('#list1', 'keydown', 38);
  }).then(function(){
    assertSelected(':first', 'selects previous element with up arrow');
  });
});

test('down selects next', function() {
  click('#trigger1').then(function() {
    return keyEvent('#list1', 'keydown', 40);
  }).then(function() {
    assertSelected(':last', 'selects next element with down arrow');
  });
});

test('loops to top', function() {
  click('#trigger1').then(function() {
    // at top of list by default
    return keyEvent('#list1', 'keydown', 40);
  }).then(function(){
    // at bottom of list
    return keyEvent('#list1', 'keydown', 40);
  }).then(function() {
    assertSelected(':first', 'loops to top element');
  });
});

test('loops to bottom', function() {
  click('#trigger1').then(function() {
    // at top of list by default
    return keyEvent('#list1', 'keydown', 38);
  }).then(function(){
    // at bottom of list
    assertSelected(':last', 'loops to bottom element');
  });
});

test('closes on focusOut', function() {
  click('#trigger1').then(function() {
    return click('button:last');
  }).then(function() {
    ok(find('#list1').is(':hidden'), 'list is not visible');
  }).then(function() {
    return click('button:last');
  });
});

function assertSelected(position, message) {
  var selectedId, positionId;
  selectedId = find(':focus').attr('id');
  positionId = find("#list1 ic-menu-item" + position).attr('id')
  equal(selectedId, positionId, message);
}

//test('repositions when window resizes');
//test('respects offset-x and offset-y');
//test('collision detection');
//test('collision detection');
//test('positions when x/y change');
//test('appends to application root element');
