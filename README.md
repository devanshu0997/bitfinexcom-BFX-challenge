
# Approach



Any client would be able to push an offer object to DHT, and then it will announce the key_hash of that object to the DHT network. Other connected clients will listen to these announces of new offer object hashes and maintain an in-memory list of all available offers (Similar to how blockchains maintain a list of pending transactions). When an offer is "done," another announcement is made so that all other connected clients remove that Offer from their in-memory list.



# Add offer

1.  Postman call to a P2P Client with Offer details
2.  An offer_id is generated using UUID
3.  A new key pair is generated and kept in-memory mapped to the UUID
4.  Using the key pair, the offer object is pushed to the DHT.
5.  A mapping of offer_id and offer object DHT Hash is kept in-memory.
6.  Offer Object DHT Hash is announced on the grape network.
7.  Properties of object are id, client_id, btc_quantity, offer_price, sequence, availability

id: UUID

client_id: Unique Identifier of Client (As bidder will need to connect to it to submit the bid)

btc_quantity: Offer Quantity

offer_price: Price demanded for this offer

sequence: Temporary workaround will not be required after refactoring

availability: Is offer available or already done.



# Maintaining in-memory distributed Offer list

1.  Each client keeps listening for announces
2.  Announce values contain DHT hash, prefixed with type of announcement.
3.  On detecting a "NEW_OFFER: <dht hash>" announcement, it extracts dht hash and fetches the offer details from grape network.
4.  After validating the offer, add it to in-memory list of offers.
5.  Whenever a offer is set to "done" by the creator, DHT hash of the same object is again announced
6.  On detecting "NEW_OFFER: <dht hash>" announcement, it again extracts DHT hash and fetches the offer details from grape network, if the offer "availability" property is set to false, then this offer is removed from the in-memory list of available offers.



# Submit Bid

1.  From the offer object, client_id is extracted
2.  A connection to target client is made using Grenache HTTP Client by providing client_id (Which is the creator of offer object)
3.  A remote call is made with offer_id
4.  The P2P client (server side) handles the request
5.  Fetches the offer object hash by offer_id from memory
6.  Fetches the keyPair using offer_id from memory
7.  The client sets the "availability" property of offer to false in DHT.



# FAQs

1. Can some clients modify the Offer of another client?

NO. Only the client who created the order can modify as only the creator of Offer has the private key to update DHT data.

2. Can a client send fake announcements to influence the list of offers in the network?

NO. Every client checks the status of the offer object on DHT before removing it from the list.



# Limitations

1. A list of different bids received is not maintained; the first bid is automatically accepted.

**Solution:** List of bids can be maintained in the offer object stored in DHT, only the client who created the offer can add bids to it.



2. New clients who join the network only know about the latest offers for which they receive announcements i.e., there is no implementation as of now to sync offers, which they were not able to listen.

**Solution:** We can add a synchronization mechanism, in which new clients will discover and connect to other clients and start receiving the older offers.



3. Private keys are stored in memory, restarting the app loses these so the offers can not be updated.

**Solution:** Use a separate persistent store for each client.



4. Grape is also embedded in P2P Client.

**Solution:** This a workaround done because of a limitation in grape implementation that it does not propagate listened **announces** to PeerRPCServer. https://github.com/bitfinexcom/grenache-grape/blob/master/lib/Grape.js#L55



# Dev Environment

I am using docker-compose for grape as well as P2P clients who are going to Create offers and accepts



1. Grape network containers: 3

2. P2P Clients containers: 3



# Testing implementation

```
make start-all
```
This will start three grape containers as well as three P2P containers. Wait a few seconds so that all containers start properly.

1.  Import the postman collection from the repository.
2.  Create a few offers from each client running on port [4000, 4001, 4002] by calling the **Create Offer** API.
3.  Check the list of offers from any of the client by calling in the **List Offers** API.
4.  Place a bid to any of the offers from any of the by offer_id by calling **Bid** API
5.  Again check the list of offers from any of the clients by calling in the **List Offers** API.

# Quick commands to test

Run
```
make start-all
```
This will start three grape containers as well as three P2P containers. Wait a few seconds so that all containers start properly.

Api for `server-01` runs on port 4000, `server-02` runs on port 4001, `server-03` runs on port 4002.



# Things Missing in code

1.  Linter
2.  Unit test Cases
3.  Integration Test Cases
4.  Generalized logic
5.  Validations
6.  Proper Logger
7.  Refactoring
8.  Convert callbacks to promises and use async/await.



# Missing Features

1.  Missing APIs update/delete Offers
2.  Maintaining a list of bids
