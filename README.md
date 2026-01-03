# 🧪 Data Serialization Lab
## JSON vs XML vs Protocol Buffers (Protobuf)

This project is a **hands-on Node.js laboratory** created to explore and compare three widely used data serialization formats:

- **JSON**
- **XML**
- **Protocol Buffers (Protobuf)**

The main goal is to understand how these formats work in practice and to observe their differences in terms of **file size** and **performance** (encoding and decoding time).

---

## 🎯 Project Goals

- Serialize the same dataset using different formats
- Measure and compare:
    - 📦 Output size
    - ⏱️ Serialization / deserialization speed
- Identify real-world use cases for each format

---

## 📋 Requirements

Before running the project, make sure you have:

- **Node.js** (version 14 or higher recommended)
- **npm** (Node Package Manager)

---

## 🚀 Installation

1. Clone the repository or copy the project files to your local machine.
2. Install the required dependencies:

```bash
npm install

###################
.
├── index.js          # Main script: data creation, serialization, performance tests
├── employee.proto    # Protobuf schema definition
├── data.json         # Generated JSON output
├── data.xml          # Generated XML output
├── data.proto        # Generated Protobuf binary output
└── package.json


# resultt