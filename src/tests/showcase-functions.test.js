import { setItem } from '../javascripts/showcase-functions'

test('setItem provide item dimensions for images', () => {
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
      {itemHeight: '496px', itemWidth: '384px'}
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
