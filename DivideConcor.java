public class DivideConcor {

    // Helper function to count occurrences of an element in a range
    public static int countInRange(int[] nums, int majority, int left, int right) {
        int count = 0; // Initialize a counter to 0
        for (int i = left; i <= right; i++) { // Loop through the specified range
            if (nums[i] == majority) { // Check if the current element matches the candidate
                count++; // Increment the counter
            }
        }
        return count; // Return the total count
    }

    // Main function to find the majority element using Divide and Conquer
    public static int findMajorityElement(int[] nums, int left, int right) {
        // Base case: if the range has only one element, return it
        if (left == right) {
            return nums[left];
        }

        // Divide: Find the midpoint of the range
        int mid = left + (right - left) / 2;

        // Recursively find the majority element in the left and right halves
        int leftMajority = findMajorityElement(nums, left, mid);
        int rightMajority = findMajorityElement(nums, mid + 1, right);

        // If both halves agree on the majority element, return it
        if (leftMajority == rightMajority) {
            return leftMajority;
        }

        // Otherwise, count each element in the current range
        int leftCount = countInRange(nums, leftMajority, left, right);
        int rightCount = countInRange(nums, rightMajority, left, right);

        // Return the element that occurs more frequently
        return leftCount > rightCount ? leftMajority : rightMajority;
    }

    public static void main(String[] args) {
        // Example array
        int nums[] = {2, 3, 3, 2, 3, 3, 2, 2, 2, 2, 2, 2};

        // Finding the majority element
        int majorityElement = findMajorityElement(nums, 0, nums.length - 1);

        // Print the result
        System.out.println("The majority element is: " + majorityElement);
    }
}
