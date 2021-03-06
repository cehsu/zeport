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
    {itemHeight: "600px", itemWidth: "464.5161290322581px"}
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

test('setItem provide item dimensions for images on mobile', () => {
  const width = 700,
  pieceIndex = 0,
  dimensions = [
    ["500px", "100px"]
  ];

  const finProps = setItem(width, pieceIndex, dimensions);

  expect(finProps).toEqual(
    {"itemHeight": "auto", "itemWidth": "100%"}
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
