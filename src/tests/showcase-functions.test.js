import { setItem } from '../javascripts/showcase-functions'

test('setItem provide item dimensions for standard images', () => {
  const width = 777,
  pieceIndex = 0,
  dimensions = [
    ["384px", "496px"],
    ["353px", "470px"],
    ["4868px", "3496px"],
    ["384px", "576px"],
    ["5760px", "3840px"]
  ];

  const finProps = setItem(width, pieceIndex, dimensions);

  expect(finProps).toEqual(
    {itemHeight: '600px', itemWidth: '317.44px'}
  );
});

test('setItem provide item dimensions for wide images', () => {
  const width = 777,
  pieceIndex = 0,
  dimensions = [
    ["1000px", "800px"]
  ];

  const finProps = setItem(width, pieceIndex, dimensions);

  expect(finProps).toEqual(
    {itemHeight: '559.44px', itemWidth: '699.3000000000001px'}
  );
});

test('setItem provide item dimensions for tall images', () => {
  const width = 750,
  pieceIndex = 0,
  dimensions = [
    ['800px', '1000px']
  ];

  const finProps = setItem(width, pieceIndex, dimensions);

  expect(finProps).toEqual(
    {itemHeight: '600px', itemWidth: '480px'}
  );
});

test('setItem provide item dimensions for narrow images', () => {
  const width = 750,
  pieceIndex = 0,
  dimensions = [
    ["100px", "500px"]
  ];

  const finProps = setItem(width, pieceIndex, dimensions);

  expect(finProps).toEqual(
    {"itemHeight": "600px", "itemWidth": "83.33333333333334px"}
  );
});

test('setItem provide item dimensions for short images', () => {
  const width = 750,
  pieceIndex = 0,
  dimensions = [
    ['600px', '10px']
  ];

  const finProps = setItem(width, pieceIndex, dimensions);

  expect(finProps).toEqual(
    {"itemHeight": "11.25px", "itemWidth": "675px"}
  );
});

test('setItem provide item dimensions for wide images on mobile', () => {
  const width = 700,
  pieceIndex = 0,
  dimensions = [
    ["500px", "100px"]
  ];

  const finProps = setItem(width, pieceIndex, dimensions);

  expect(finProps).toEqual(
    {"itemHeight": "126px", "itemWidth": "100%"}
  );
});

test('setItem provide item dimensions for tall images on mobile', () => {
  const width = 700,
  pieceIndex = 0,
  dimensions = [
    ['100px', '500px']
  ];

  const finProps = setItem(width, pieceIndex, dimensions);

  expect(finProps).toEqual(
      {"itemHeight": "3150px", "itemWidth": "100%"}
  );
});

test('setItem does not provide dimensions for videos', () => {
  const startProps = {
    width: 777,
    pieceIndex: 0,
    dimensions: undefined
  };

  const finProps = setItem(startProps);

  expect(finProps).toEqual(
      {itemHeight: undefined, itemWidth: undefined}
  );
});
