const { acceptFriendRequest, declineAllFriendRequests, declineFriendRequest, getFollowers, getFollowings, getFriendRequests, getFriends, removeFriend, sendFriendRequest, unfollow, setCookie } = require('../lib')

beforeAll(() => {
  return new Promise(resolve => {
    setCookie(process.env.COOKIE).then(() => {
      resolve()
    })
  })
})

describe('Friends Methods', () => {
  it('sendFriendRequest() sends a friend request to the specified user', () => {
    return removeFriend(857710783).then(async () => {
      return await expect(sendFriendRequest(857710783)).resolves.not.toThrow()
    })
  })

  it('acceptFriendRequest() accepts a friend request', async () => {
    return setCookie(process.env.COOKIE_2).then(async () => {
      return await expect(acceptFriendRequest(64679301)).resolves.not.toThrow()
    })
  })
  it('removeFriend() unfriends a user', async () => {
    return await expect(removeFriend(64679301)).resolves.not.toThrow()
  })

  it('declineAllFriendRequests() declines all friend requests', async () => {
    return await expect(declineAllFriendRequests()).resolves.not.toThrow()
  })

  it('unfollow() unfollows a user on Roblox', async () => {
    return await expect(unfollow(55549140)).resolves.not.toThrow()
  })

  it('getFollowers() returns a user\'s followers', () => {
    return getFollowers(55549140).then((res) => {
      return expect(res).toMatchObject({
        previousPageCursor: expect.toBeOneOf([expect.any(String), null]),
        nextPageCursor: expect.toBeOneOf([expect.any(String), null]),
        data: expect.arrayContaining([
          expect.objectContaining({
            created: expect.any(String),
            id: expect.any(Number),
            name: expect.any(String)
          })
        ])
      })
    })
  })

  it('getFollowings() returns which users are being followed by the specified user', () => {
    return getFollowings(55549140).then((res) => {
      return expect(res).toMatchObject({
        previousPageCursor: expect.toBeOneOf([expect.any(String), null]),
        nextPageCursor: expect.toBeOneOf([expect.any(String), null]),
        data: expect.arrayContaining([
          expect.objectContaining({
            created: expect.any(String),
            id: expect.any(Number),
            name: expect.any(String)
          })
        ])
      })
    })
  })

  it('getFriendRequests() returns the logged in user\'s incoming friend requests', () => {
    return getFriendRequests().then((res) => {
      console.log(res)
      return expect(res).toMatchObject({
        previousPageCursor: expect.toBeOneOf([expect.any(String), null]),
        nextPageCursor: expect.toBeOneOf([expect.any(String), null]),
        data: expect.toBeOneOf([
          expect.arrayContaining([
            expect.objectContaining({
              created: expect.any(String),
              id: expect.any(Number),
              name: expect.any(String)
            })
          ]),
          expect.not.arrayContaining([expect.any(Object)])
        ])
      })
    })
  })

  it('getFriends() returns the friends of the specified user', () => {
    return getFriends(64679301).then((res) => {
      return expect(res).toMatchObject({
        data: expect.arrayContaining([
          expect.objectContaining({
            created: expect.any(String),
            id: expect.any(Number),
            name: expect.any(String),
            isDeleted: expect.any(Boolean),
            isOnline: expect.any(Boolean)
          })
        ])
      })
    })
  })

  it('declineFriendRequest() declines a friend request', async () => {
    await setCookie(process.env.COOKIE).then(() => {
      sendFriendRequest(857710783)
    })

    return setCookie(process.env.COOKIE_2).then(async () => {
      return await expect(declineFriendRequest(64679301)).resolves.not.toThrow()
    })
  })
})
