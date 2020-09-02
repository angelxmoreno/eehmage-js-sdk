import 'mocha';
import { expect } from 'chai';
import { EehMageClient, EehMageFactory } from '../src';
import { GroupEntity, GroupRequest } from '../src/EehMageClient/types';

describe('EehMageClient::class', () => {
    const apiKey = 'When7Eight9';
    const baseUrl = 'http://localhost:8311';
    const client: EehMageClient = EehMageFactory.create(apiKey, baseUrl);

    const expectToBeAGroup = (group: GroupEntity) => {
        expect(group.id).to.be.a('string');
        expect(group.is_active).to.be.a('boolean');
        expect(group.name).to.be.a('string');
        expect(group.dir).to.be.a('string');
    };

    const expectToBeAGroupWithData = (group: GroupEntity, data: GroupRequest) => {
        expect(group.name).to.be.equal(data.name);
        expect(group.is_active).to.be.equal(data.is_active);
    };

    const createAGroup = async (payload?: Partial<GroupRequest>): Promise<[GroupRequest, GroupEntity]> => {
        const data: GroupRequest = {
            name: ('group ' + Math.random()).substr(0, 16),
            is_active: false,
            ...payload,
        };
        const group = await client.group.create(data);

        return [data, group];
    };
    describe('EehMageClient::healthCheck()', () => {
        it('returns auth true when a valid key is given', async () => {
            const data = await client.healthCheck();
            expect(data.status).to.equal('ok');
            expect(data.auth).to.equal(true);
        });

        it('returns auth false when an invalid key is given', async () => {
            const badClient = EehMageFactory.create('', baseUrl);
            const data = await badClient.healthCheck();
            expect(data.status).to.equal('ok');
            expect(data.auth).to.equal(false);
        });
    });

    describe('EehMageClient::Groups', () => {
        describe('Creating a Group', () => {
            it('can create a group', async () => {
                const [data, group] = await createAGroup();
                expectToBeAGroup(group);
                expectToBeAGroupWithData(group, data);
            });

            it('returns an error when the name is invalid', async () => {
                try {
                    await createAGroup({ name: '' });
                    throw new Error('Failed to fail');
                } catch (error) {
                    expect(error.message).to.equal('Validation Error');
                }
            });
        });

        describe('Listing Groups', () => {
            it('returns an array of groups', async () => {
                await createAGroup();
                const list = await client.group.list();
                expect(list).to.be.an('array');
                list.forEach(expectToBeAGroup);
            });
        });
    });
});
