// describe("validateRequiredFields", () => {
//     const requiredFields = ["name", "age", "email"];
  
//     it("should return an error if obj is null", () => {
//       const obj = null;
//       const result = validateRequiredFields(obj, requiredFields);
//       expect(result).toEqual(new Error("object is null"));
//     });
  
//     it("should return an error if a required field is missing", () => {
//       const obj = { name: "John", age: 25 };
//       const result = validateRequiredFields(obj, requiredFields);
//       expect(result).toEqual(new Error("field email does not exist"));
//     });
  
//     it("should return an error if a required field is empty or null", () => {
//       const obj = { name: "John", age: 25, email: "" };
//       const result = validateRequiredFields(obj, requiredFields);
//       expect(result).toEqual(new Error("field email cannot be empty or null"));
//     });
  
//     it("should return null if all required fields are present and non-empty", () => {
//       const obj = { name: "John", age: 25, email: "john@example.com" };
//       const result = validateRequiredFields(obj, requiredFields);
//       expect(result).toBeNull();
//     });
//   });