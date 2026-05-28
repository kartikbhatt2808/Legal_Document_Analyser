import json
import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class PropertyCheckRequest(BaseModel):
    property_id: str
    seller_name: str

def load_mock_data():
    dataset_path = os.path.join(os.path.dirname(__file__), "..", "datasets", "mock_properties.json")
    if not os.path.exists(dataset_path):
        return []
    with open(dataset_path, "r") as f:
        return json.load(f)

@router.post("/")
def verify_property(request: PropertyCheckRequest):
    """
    Simulates checking a property dataset for ownership verification.
    Matches the property_id and normalizes the seller_name.
    """
    data = load_mock_data()
    # Find property by ID
    property_record = next((item for item in data if item["property_id"].lower() == request.property_id.lower()), None)
    
    if not property_record:
        return {
            "status": "Suspicious",
            "message": f"Property ID {request.property_id} not found in official records."
        }
    
    # Normalize names (lowercase and strip spaces) for comparison
    input_name_normalized = request.seller_name.lower().replace(" ", "")
    record_name_normalized = property_record["owner_name"].lower().replace(" ", "")
    
    if input_name_normalized != record_name_normalized:
        return {
            "status": "Suspicious",
            "message": f"Seller name mismatch. Official records show different ownership.",
            "official_owner": property_record["owner_name"]
        }
    
    if property_record.get("status") != "Verified":
         return {
            "status": "Suspicious",
            "message": "Property is marked as disputed or unverified in official records.",
            "official_owner": property_record["owner_name"]
        }

    return {
        "status": "Verified",
        "message": "Property ownership verified successfully against official records.",
        "official_owner": property_record["owner_name"],
        "location": property_record.get("location", "Unknown")
    }
