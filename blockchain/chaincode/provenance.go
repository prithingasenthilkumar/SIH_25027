package main

import (
	"crypto/sha256"
	"encoding/json"
	"fmt"
	"strconv"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type ProvenanceContract struct {
	contractapi.Contract
}

// Data Structures
type CollectionEvent struct {
	EventID       string `json:"eventId"`
	FarmerID      string `json:"farmerId"`
	CropID        string `json:"cropId"`
	Timestamp     int64  `json:"timestamp"`
	GeoCoords     string `json:"geoCoordinates"`
	DetailsHash   string `json:"detailsHash"`
	GeoFenceValid bool   `json:"geoFenceValid"`
	SeasonValid   bool   `json:"seasonValid"`
}

type QualityTest struct {
	TestID     string `json:"testId"`
	LabID      string `json:"labId"`
	BatchID    string `json:"batchId"`
	Result     bool   `json:"result"`
	ReportHash string `json:"reportHash"`
	Timestamp  int64  `json:"timestamp"`
	TestType   string `json:"testType"`
}

type ProcessingStep struct {
	StepID           string `json:"stepId"`
	ProcessorID      string `json:"processorId"`
	BatchID          string `json:"batchId"`
	Action           string `json:"action"`
	Timestamp        int64  `json:"timestamp"`
	DetailsHash      string `json:"detailsHash"`
	QualityMaintained bool   `json:"qualityMaintained"`
}

type Provenance struct {
	BatchID          string   `json:"batchId"`
	CollectionEvents []string `json:"collectionEvents"`
	QualityTests     []string `json:"qualityTests"`
	ProcessingSteps  []string `json:"processingSteps"`
	Certifications   []string `json:"certifications"`
	Status           string   `json:"status"`
	CreatedAt        int64    `json:"createdAt"`
}

type Certification struct {
	CertID          string `json:"certId"`
	BatchID         string `json:"batchId"`
	CertType        string `json:"certType"`
	IssuerHash      string `json:"issuerHash"`
	CertificateHash string `json:"certificateHash"`
	ExpiryDate      int64  `json:"expiryDate"`
	IsValid         bool   `json:"isValid"`
}

type QRLink struct {
	QRCode         string `json:"qrCode"`
	BatchID        string `json:"batchId"`
	ProvenanceHash string `json:"provenanceHash"`
	CreatedAt      int64  `json:"createdAt"`
	IsActive       bool   `json:"isActive"`
}

// Smart Contract Functions
func (pc *ProvenanceContract) RecordCollectionEvent(ctx contractapi.TransactionContextInterface, eventID, farmerID, cropID, geoCoords, detailsHash string) error {
	timestamp := time.Now().Unix()
	
	event := CollectionEvent{
		EventID:       eventID,
		FarmerID:      farmerID,
		CropID:        cropID,
		Timestamp:     timestamp,
		GeoCoords:     geoCoords,
		DetailsHash:   detailsHash,
		GeoFenceValid: pc.validateGeoFence(geoCoords),
		SeasonValid:   pc.validateSeason(cropID, timestamp),
	}
	
	eventJSON, _ := json.Marshal(event)
	return ctx.GetStub().PutState(eventID, eventJSON)
}

func (pc *ProvenanceContract) RecordQualityTest(ctx contractapi.TransactionContextInterface, testID, labID, batchID, reportHash, testType string, result bool) error {
	test := QualityTest{
		TestID:     testID,
		LabID:      labID,
		BatchID:    batchID,
		Result:     result,
		ReportHash: reportHash,
		Timestamp:  time.Now().Unix(),
		TestType:   testType,
	}
	
	testJSON, _ := json.Marshal(test)
	return ctx.GetStub().PutState(testID, testJSON)
}

func (pc *ProvenanceContract) CreateProvenance(ctx contractapi.TransactionContextInterface, batchID string) error {
	provenance := Provenance{
		BatchID:   batchID,
		Status:    "ACTIVE",
		CreatedAt: time.Now().Unix(),
	}
	
	provenanceJSON, _ := json.Marshal(provenance)
	return ctx.GetStub().PutState(batchID, provenanceJSON)
}

func (pc *ProvenanceContract) GetProvenance(ctx contractapi.TransactionContextInterface, batchID string) (*Provenance, error) {
	provenanceJSON, err := ctx.GetStub().GetState(batchID)
	if err != nil || provenanceJSON == nil {
		return nil, fmt.Errorf("provenance not found")
	}
	
	var provenance Provenance
	json.Unmarshal(provenanceJSON, &provenance)
	return &provenance, nil
}

func (pc *ProvenanceContract) validateGeoFence(geoCoords string) bool {
	approvedZones := map[string]bool{
		"26.9124,75.7873": true,
		"28.6139,77.2090": true,
	}
	return approvedZones[geoCoords]
}

func (pc *ProvenanceContract) validateSeason(cropID string, timestamp int64) bool {
	return true // Simplified validation
}

func main() {
	chaincode, _ := contractapi.NewChaincode(&ProvenanceContract{})
	chaincode.Start()
}