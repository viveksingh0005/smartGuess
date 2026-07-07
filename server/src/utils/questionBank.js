const QUESTIONS_BANK = {

  // ====================== STRATEGIC (10 questions) ======================

  // 1. Splits board in half instantly
  NUMBERS_0_TO_7_COUNT: {
    text: "How many of your numbers are between 0 and 7 (inclusive)?",
    category: "strategic",
    resolve: (nums) => nums.filter(n => n <= 7).length
  },

  // 2. Reveals total — massively narrows combinations
  TOTAL_SUM: {
    text: "What is the total sum of all your 8 numbers?",
    category: "strategic",
    resolve: (nums) => nums.reduce((a, b) => a + b, 0)
  },

  // 3. Anchor point — lowest number confirmed
  FIRST_NUMBER: {
    text: "What is your lowest number?",
    category: "strategic",
    resolve: (nums) => Math.min(...nums)
  },

  // 4. Anchor point — highest number confirmed
  LAST_NUMBER: {
    text: "What is your highest number?",
    category: "strategic",
    resolve: (nums) => Math.max(...nums)
  },

  // 5. Even/odd split narrows combos
  EVEN_COUNT: {
    text: "How many EVEN numbers do you have?",
    category: "strategic",
    resolve: (nums) => nums.filter(n => n % 2 === 0).length
  },

  // 6. Sum of lower half
  SUM_LOWEST_FOUR: {
    text: "What is the sum of your 4 lowest numbers?",
    category: "strategic",
    resolve: (nums) => [...nums].sort((a, b) => a - b).slice(0, 4).reduce((a, b) => a + b, 0)
  },

  // 7. Confirms double digit presence
  DOUBLE_DIGIT_COUNT: {
    text: "How many double-digit numbers (10 to 15) do you have?",
    category: "strategic",
    resolve: (nums) => nums.filter(n => n >= 10).length
  },

  // 8. Narrows middle cluster
  MEDIAN_LOW: {
    text: "What is the average of your 4th and 5th lowest numbers?",
    category: "strategic",
    resolve: (nums) => {
      const sorted = [...nums].sort((a, b) => a - b);
      return (sorted[3] + sorted[4]) / 2;
    }
  },

  // 9. Confirms specific endgame number
  SECOND_LOWEST: {
    text: "What is your 2nd lowest number?",
    category: "strategic",
    resolve: (nums) => [...nums].sort((a, b) => a - b)[1]
  },

  // 10. Largest gap reveals missing clusters
  LARGEST_GAP: {
    text: "What is the largest gap between any two adjacent numbers in your sorted series?",
    category: "strategic",
    resolve: (nums) => {
      const sorted = [...nums].sort((a, b) => a - b);
      let maxGap = 0;
      for (let i = 1; i < sorted.length; i++) {
        maxGap = Math.max(maxGap, sorted[i] - sorted[i - 1]);
      }
      return maxGap;
    }
  },

  // 11. 2nd lowest anchor
  SECOND_HIGHEST: {
    text: "What is your 2nd highest number?",
    category: "strategic",
    resolve: (nums) => [...nums].sort((a, b) => b - a)[1]
  },

  // 12. Sum of 4th and 5th numbers
  SUM_4TH_5TH: {
    text: "What is the sum of your 4th and 5th lowest numbers?",
    category: "strategic",
    resolve: (nums) => {
      const sorted = [...nums].sort((a, b) => a - b);
      return sorted[3] + sorted[4];
    }
  },

  // 13. 2nd lowest anchor
  SECOND_LOWEST_CONFIRM: {
    text: "What is your 2nd lowest number?",
    category: "strategic",
    resolve: (nums) => [...nums].sort((a, b) => a - b)[1]
  },

  // ====================== BLUFF (5 questions — waste opponent's round) ======================

  // 11
  SUM_IS_EVEN: {
    text: "Is the total sum of all your numbers Even or Odd?",
    category: "bluff",
    resolve: (nums) => nums.reduce((a, b) => a + b, 0) % 2 === 0 ? "Even" : "Odd"
  },

  // 12
  HAS_NUMBER_7: {
    text: "Do you have the lucky number 7?",
    category: "bluff",
    resolve: (nums) => nums.includes(7) ? "Yes" : "No"
  },

  // 13
  MORE_EVEN_OR_ODD: {
    text: "Do you have more Even or Odd numbers?",
    category: "bluff",
    resolve: (nums) => {
      const evens = nums.filter(n => n % 2 === 0).length;
      const odds = nums.length - evens;
      if (evens > odds) return "More Even";
      if (odds > evens) return "More Odd";
      return "Equal";
    }
  },

  // 14
  HAS_CONSECUTIVE_PAIR: {
    text: "Do you have at least one pair of consecutive numbers?",
    category: "bluff",
    resolve: (nums) => {
      const sorted = [...nums].sort((a, b) => a - b);
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === sorted[i - 1] + 1) return "Yes";
      }
      return "No";
    }
  },

  // 15
  HIGHEST_MINUS_LOWEST: {
    text: "What is your highest number minus your lowest number?",
    category: "bluff",
    resolve: (nums) => Math.max(...nums) - Math.min(...nums)
  },

};

module.exports = { QUESTIONS_BANK };