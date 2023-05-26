import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";

describe('useVisualMode', () => {
  const FIRST_MODE = 'FIRST';
  const SECOND_MODE = 'SECOND';
  const THIRD_MODE = 'THIRD';

  test("useVisualMode should return to previous mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST_MODE));

    act(() => result.current.transition(SECOND_MODE));
    expect(result.current.mode).toBe(SECOND_MODE);

    act(() => result.current.transition(THIRD_MODE));
    expect(result.current.mode).toBe(THIRD_MODE);

    act(() => result.current.back());
    expect(result.current.mode).toBe(SECOND_MODE);

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST_MODE);
  });

  it('should initialize with the initial mode', () => {
    const { result } = renderHook(() => useVisualMode(FIRST_MODE));
    expect(result.current.mode).toBe(FIRST_MODE);
  });

  it('should transition to another mode', () => {
    const { result } = renderHook(() => useVisualMode(FIRST_MODE));
    act(() => {
      result.current.transition(SECOND_MODE);
    });
    expect(result.current.mode).toBe(SECOND_MODE);
  });

  it('should go back to the previous mode', () => {
    const { result } = renderHook(() => useVisualMode(FIRST_MODE));

    act(() => {
      result.current.transition(SECOND_MODE);
      
    });
    act(() => {
      result.current.transition(SECOND_MODE);
     
    });
    act(() => {
     
      result.current.back();
    });
    expect(result.current.mode).toBe(SECOND_MODE);
  });

  it("should initialize with default value", () => {
    const DEFAULT_MODE = "DEFAULT";
    const { result } = renderHook(() => useVisualMode(DEFAULT_MODE));
    expect(result.current.mode).toBe(DEFAULT_MODE);
  });

  it("should replace the current mode", () => {
    const { result } = renderHook(() => useVisualMode(FIRST_MODE));

    act(() => result.current.transition(SECOND_MODE));
    expect(result.current.mode).toBe(SECOND_MODE);

    act(() => result.current.transition(THIRD_MODE, true));
    expect(result.current.mode).toBe(THIRD_MODE);

    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST_MODE);
  });
});
