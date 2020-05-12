import { ActionReducer, movementReducer, State } from './use-draggable-container';

describe('movementReducer', () => {
  const initialState: State = {
    current: 0,
    dir: 'left',
    offset: 0,
    startX: 0,
    startOffset: 0,
    isActive: false,
    isLeftLimit: true,
    isRightLimit: false,
  };

  const width = {
    actual: 200,
    visible: 100,
  };

  function start(x: number): ActionReducer {
    return {
      type: 'start',
      width,
      x,
    };
  }

  function move(x: number): ActionReducer {
    return {
      type: 'move',
      width,
      x,
    };
  }

  function end(x: number): ActionReducer {
    return {
      type: 'end',
      width,
      x,
    };
  }

  describe('dir', () => {
    test('right', () => {
      const state = [start(0), move(1), move(2)].reduce(movementReducer, initialState);
      expect(state.dir).toBe('right');
    });

    test('left', () => {
      const state = [start(0), move(-1), move(-2)].reduce(movementReducer, initialState);
      expect(state.dir).toBe('left');
    });

    test('null', () => {
      const state = [start(0), move(-1), move(-2), end(-2)].reduce(movementReducer, initialState);
      expect(state.dir).toBe(null);
    });
  });

  describe('offset', () => {
    test('перемещение вправо', () => {
      const state = [start(0), move(1), end(1)].reduce(movementReducer, initialState);
      expect(state.offset).toBe(0);
    });

    test('перемещение влево', () => {
      let state = [start(0), move(-1), end(-1)].reduce(movementReducer, initialState);
      expect(state.offset).toBe(-1);
      state = [start(0), move(-1), end(-1), start(-4), move(-5), move(-6), end(-6)].reduce(
        movementReducer,
        initialState,
      );

      expect(state.offset).toBe(-3);
    });

    test('ограничение offset шириной элемента', () => {
      const state = [start(0), move(-101), end(-101)].reduce(movementReducer, initialState);
      expect(state.offset).toBe(-100);
    });

    test('установка нужного offset', () => {
      let state = movementReducer(initialState, { type: 'force', offset: -200, width });
      expect(state.offset).toBe(-100);

      state = movementReducer(initialState, { type: 'force', offset: 200, width });
      expect(state.offset).toBe(0);
    });
  });

  test('isActive', () => {
    let state = movementReducer(initialState, start(0));
    expect(state.isActive).toBe(true);

    state = movementReducer(state, move(-1));
    expect(state.isActive).toBe(true);

    state = movementReducer(state, end(-1));
    expect(state.isActive).toBe(false);
  });
});
