/** @format */

import testingDB from 'api/utils/testing_db';
import migration from '../index';
import fixtures, { i2 } from './fixtures';

describe('migration metadata-structured-object', () => {
  beforeEach(async () => {
    //spyOn(process.stdout, 'write');
    await testingDB.clearAllAndLoad(fixtures);
  });

  afterAll(async () => {
    await testingDB.disconnect();
  });

  it('should have a delta number', () => {
    expect(migration.delta).toBe(16);
  });

  it('should remove connections that have entities that no longer exists', async () => {
    await migration.up(testingDB.mongodb);
    const entities = await testingDB.mongodb
      .collection('entities')
      .find()
      .toArray();

    expect(entities[0].metadata.friends[0]).toEqual({ value: 'shared-e2', label: 'e2' });
    expect(entities[0].metadata.current_address_geolocation[0]).toEqual({
      value: { lat: 1, lng: 2, label: 'a' },
    });
    expect(entities[1].metadata.issues[1]).toEqual({ value: i2, label: 'Kidnapping' });
  });
});