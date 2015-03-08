
// Matched keywords in size value list.
assertInterpolation({
  property: 'background-size',
  from: '0px 0px, 0px 0px, contain, cover',
  to: '40px 40px, 40px 40px, contain, cover',
}, [
  {at: -0.25, is: ' 0px  0px,  0px  0px, contain, cover'},
  {at: 0, is:     ' 0px  0px,  0px  0px, contain, cover'},
  {at: 0.25, is:  ' 0px  0px,  0px  0px, contain, cover'},
  {at: 0.5, is:   '40px 40px, 40px 40px, contain, cover'},
  {at: 0.75, is:  '40px 40px, 40px 40px, contain, cover'},
  {at: 1, is:     '40px 40px, 40px 40px, contain, cover'},
  {at: 1.25, is:  '40px 40px, 40px 40px, contain, cover'},
]);

// Mismatched keywords in size value list.
assertInterpolation({
  property: 'background-size',
  from: '0px 0px, 0px 0px, contain, cover',
  to: '40px 40px, 40px 40px, cover, contain',
}, [
  {at: -0.25, is: ' 0px  0px,  0px  0px, contain, cover'},
  {at: 0, is:     ' 0px  0px,  0px  0px, contain, cover'},
  {at: 0.25, is:  ' 0px  0px,  0px  0px, contain, cover'},
  {at: 0.5, is:   '40px 40px, 40px 40px, cover, contain'},
  {at: 0.75, is:  '40px 40px, 40px 40px, cover, contain'},
  {at: 1, is:     '40px 40px, 40px 40px, cover, contain'},
  {at: 1.25, is:  '40px 40px, 40px 40px, cover, contain'},
]);

// Equal number of size values as background images.
assertInterpolation({
  property: 'background-size',
  from: '0px 0px, 0px 0px, 0px 0px, 0px 0px',
  to: '20px 20px, 40px 40px, 60px 60px, 100px 100px',
}, [
  {at: -0.25, is: ' 0px  0px,  0px  0px,  0px  0px,   0px   0px'},
  {at: 0, is:     ' 0px  0px,  0px  0px,  0px  0px,   0px   0px'},
  {at: 0.25, is:  ' 5px  5px, 10px 10px, 15px 15px,  25px  25px'},
  {at: 0.5, is:   '10px 10px, 20px 20px, 30px 30px,  50px  50px'},
  {at: 0.75, is:  '15px 15px, 30px 30px, 45px 45px,  75px  75px'},
  {at: 1, is:     '20px 20px, 40px 40px, 60px 60px, 100px 100px'},
  {at: 1.25, is:  '25px 25px, 50px 50px, 75px 75px, 125px 125px'},
]);

// Single size value repeated over background images.
assertInterpolation({
  property: 'background-size',
  from: '0px 0px',
  to: '80px 80px',
}, [
  {at: -0.25, is: '  0px   0px,   0px   0px,   0px   0px,   0px   0px'},
  {at: 0, is:     '  0px   0px,   0px   0px,   0px   0px,   0px   0px'},
  {at: 0.25, is:  ' 20px  20px,  20px  20px,  20px  20px,  20px  20px'},
  {at: 0.5, is:   ' 40px  40px,  40px  40px,  40px  40px,  40px  40px'},
  {at: 0.75, is:  ' 60px  60px,  60px  60px,  60px  60px,  60px  60px'},
  {at: 1, is:     ' 80px  80px,  80px  80px,  80px  80px,  80px  80px'},
  {at: 1.25, is:  '100px 100px, 100px 100px, 100px 100px, 100px 100px'},
]);

// Mismatched numbers of size values.
assertInterpolation({
  property: 'background-size',
  from: '0px 0px, 80px 0px',
  to: '40px 40px, 80px 80px, 0px 80px',
}, [
  {at: -0.25, is: ' 0px  0px, 80px   0px, 0px   0px, 90px  0px'},
  {at: 0, is:     ' 0px  0px, 80px   0px, 0px   0px, 80px  0px'},
  {at: 0.25, is:  '10px 10px, 80px  20px, 0px  20px, 70px 10px'},
  {at: 0.5, is:   '20px 20px, 80px  40px, 0px  40px, 60px 20px'},
  {at: 0.75, is:  '30px 30px, 80px  60px, 0px  60px, 50px 30px'},
  {at: 1, is:     '40px 40px, 80px  80px, 0px  80px, 40px 40px'},
  {at: 1.25, is:  '50px 50px, 80px 100px, 0px 100px, 30px 50px'},
]);
