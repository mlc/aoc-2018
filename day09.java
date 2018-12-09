
public class day09 {
  public static void main(String[] args) {
    final int players = Integer.parseInt(args[0]);
    final int max = Integer.parseInt(args[1]);

    Marble current = new Marble(0, null, null);
    final Marble zero = current;
    current.next = current;
    current.prev = current;
    long[] scores = new long[players];

    for (int i = 1; i <= max; ++i) {
      int player = (i % players);

      if (i % 23 == 0) {
        scores[player] += i;
        current = current.prev.prev.prev.prev.prev.prev.prev;
        current.prev.next = current.next;
        current.next.prev = current.prev;
        scores[player] += current.value;
        current = current.next;
      } else {
        current = current.next;
        Marble insertion = new Marble(i, current.next, current);
        current.next.prev = insertion;
        current.next = insertion;
        current = insertion;
      }

      // Marble t = zero;
      // for (int j = 0; j <= i; ++j) {
      //   System.out.print(t.value + " ");
      //   t = t.next;
      // }
      // System.out.println();
    }

    long maxM = 0;
    for (long score : scores) {
      if (score > maxM) {
        maxM = score;
      }
    }
    System.out.println(maxM);
  }

  static class Marble {
    Marble next;
    Marble prev;
    final int value;

    Marble(int value, Marble next, Marble prev) {
      this.value = value;
      this.next = next;
      this.prev = prev;
    }
  }
}
