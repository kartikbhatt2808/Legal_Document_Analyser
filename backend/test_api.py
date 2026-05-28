import requests

def test_property():
    print("Testing Property Verification API...")
    url = "http://localhost:8000/api/verify-property"
    # Testing a verified user
    data = {"property_id": "PROP12345", "seller_name": "Ramesh Kumar"}
    res = requests.post(url, json=data)
    print("Record 1:", res.json())

    # Testing an invalid user mapping
    data2 = {"property_id": "PROP12345", "seller_name": "Fake Name"}
    res2 = requests.post(url, json=data2)
    print("Record 2:", res2.json())
    print()

def test_analyzer():
    print("Testing AI Analyzer API...")
    url = "http://localhost:8000/api/analyze"
    dataset_path = "datasets/test_agreement.txt"
    with open(dataset_path, "rb") as f:
        files = {"file": ("test_agreement.txt", f, "text/plain")}
        res = requests.post(url, files=files)
        print("Response:", res.json())

if __name__ == "__main__":
    try:
        test_property()
        test_analyzer()
    except Exception as e:
        print("Error connecting to server:", e)
