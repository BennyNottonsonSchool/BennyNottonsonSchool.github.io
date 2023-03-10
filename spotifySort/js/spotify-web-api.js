"use strict";
var SpotifyWebApi = function() {
    var t = "https://api.spotify.com/v1",
        e = null,
        r = null,
        o = function(t, e) {
            return t.abort = e, t
        },
        n = function(t, e) {
            var n;
            if (null !== r) {
                var s = r.defer();
                t(function(t) {
                    s.resolve(t)
                }, function(t) {
                    s.reject(t)
                }), n = s.promise
            } else window.Promise && (n = new window.Promise(t));
            return n ? new o(n, e) : null
        },
        s = function() {
            var t, e = Array.prototype.slice.call(arguments),
                r = e[0];
            return r = r || {}, e.slice(1).forEach(function(t) {
                for (var e in t) t.hasOwnProperty(e) && (r[e] = t[e])
            }), r
        },
        a = function(t, e) {
            var r = "";
            for (var o in e)
                if (e.hasOwnProperty(o)) {
                    var n = e[o];
                    r += encodeURIComponent(o) + "=" + encodeURIComponent(n) + "&"
                } return r.length > 0 && (t = t + "?" + (r = r.substring(0, r.length - 1))), t
        },
        i = function(t, r) {
            var o = new XMLHttpRequest,
                s = function(n, s) {
                    var i = t.type || "GET";
                    if (o.open(i, a(t.url, t.params)), e && o.setRequestHeader("Authorization", "Bearer " + e), o.onreadystatechange = function() {
                            if (4 === o.readyState) {
                                var t, e = null;
                                try {
                                    e = o.responseText ? JSON.parse(o.responseText) : ""
                                } catch (a) {
                                    console.error(a)
                                }
                                o.status >= 200 && o.status < 300 ? (t = e, n && n(t), r && r(null, t)) : (s && s(o), r && r(o, null))
                            }
                        }, "GET" === i) o.send(null);
                    else {
                        var p = null;
                        t.postData && ("image/jpeg" === t.contentType ? (p = t.postData, o.setRequestHeader("Content-Type", t.contentType)) : (p = JSON.stringify(t.postData), o.setRequestHeader("Content-Type", "application/json"))), o.send(p)
                    }
                };
            return r ? (s(), null) : n(s, function() {
                o.abort()
            })
        },
        p = function(t, e, r, o) {
            var n = {},
                a = null;
            return "object" == typeof e ? (n = e, a = r) : "function" == typeof e && (a = e), "GET" !== (t.type || "GET") && t.postData && !o ? t.postData = s(t.postData, n) : t.params = s(t.params, n), i(t, a)
        },
        u = function() {};
    return u.prototype = {
        constructor: SpotifyWebApi
    }, u.prototype.getGeneric = function(t, e) {
        return p({
            url: t
        }, e)
    }, u.prototype.getMe = function(e, r) {
        return p({
            url: t + "/me"
        }, e, r)
    }, u.prototype.getMySavedTracks = function(e, r) {
        return p({
            url: t + "/me/tracks"
        }, e, r)
    }, u.prototype.addToMySavedTracks = function(e, r, o) {
        return p({
            url: t + "/me/tracks",
            type: "PUT",
            postData: e
        }, r, o)
    }, u.prototype.removeFromMySavedTracks = function(e, r, o) {
        return p({
            url: t + "/me/tracks",
            type: "DELETE",
            postData: e
        }, r, o)
    }, u.prototype.containsMySavedTracks = function(e, r, o) {
        return p({
            url: t + "/me/tracks/contains",
            params: {
                ids: e.join(",")
            }
        }, r, o)
    }, u.prototype.getMySavedAlbums = function(e, r) {
        return p({
            url: t + "/me/albums"
        }, e, r)
    }, u.prototype.addToMySavedAlbums = function(e, r, o) {
        return p({
            url: t + "/me/albums",
            type: "PUT",
            postData: e
        }, r, o)
    }, u.prototype.removeFromMySavedAlbums = function(e, r, o) {
        return p({
            url: t + "/me/albums",
            type: "DELETE",
            postData: e
        }, r, o)
    }, u.prototype.containsMySavedAlbums = function(e, r, o) {
        return p({
            url: t + "/me/albums/contains",
            params: {
                ids: e.join(",")
            }
        }, r, o)
    }, u.prototype.getMyTopArtists = function(e, r) {
        return p({
            url: t + "/me/top/artists"
        }, e, r)
    }, u.prototype.getMyTopTracks = function(e, r) {
        return p({
            url: t + "/me/top/tracks"
        }, e, r)
    }, u.prototype.getMyRecentlyPlayedTracks = function(e, r) {
        return p({
            url: t + "/me/player/recently-played"
        }, e, r)
    }, u.prototype.followUsers = function(e, r) {
        return p({
            url: t + "/me/following/",
            type: "PUT",
            params: {
                ids: e.join(","),
                type: "user"
            }
        }, r)
    }, u.prototype.followArtists = function(e, r) {
        return p({
            url: t + "/me/following/",
            type: "PUT",
            params: {
                ids: e.join(","),
                type: "artist"
            }
        }, r)
    }, u.prototype.followPlaylist = function(e, r, o) {
        return p({
            url: t + "/playlists/" + e + "/followers",
            type: "PUT",
            postData: {}
        }, r, o)
    }, u.prototype.unfollowUsers = function(e, r) {
        return p({
            url: t + "/me/following/",
            type: "DELETE",
            params: {
                ids: e.join(","),
                type: "user"
            }
        }, r)
    }, u.prototype.unfollowArtists = function(e, r) {
        return p({
            url: t + "/me/following/",
            type: "DELETE",
            params: {
                ids: e.join(","),
                type: "artist"
            }
        }, r)
    }, u.prototype.unfollowPlaylist = function(e, r) {
        return p({
            url: t + "/playlists/" + e + "/followers",
            type: "DELETE"
        }, r)
    }, u.prototype.isFollowingUsers = function(e, r) {
        return p({
            url: t + "/me/following/contains",
            type: "GET",
            params: {
                ids: e.join(","),
                type: "user"
            }
        }, r)
    }, u.prototype.isFollowingArtists = function(e, r) {
        return p({
            url: t + "/me/following/contains",
            type: "GET",
            params: {
                ids: e.join(","),
                type: "artist"
            }
        }, r)
    }, u.prototype.areFollowingPlaylist = function(e, r, o) {
        return p({
            url: t + "/playlists/" + e + "/followers/contains",
            type: "GET",
            params: {
                ids: r.join(",")
            }
        }, o)
    }, u.prototype.getFollowedArtists = function(e, r) {
        return p({
            url: t + "/me/following",
            type: "GET",
            params: {
                type: "artist"
            }
        }, e, r)
    }, u.prototype.getUser = function(e, r, o) {
        var n = {
            url: t + "/users/" + encodeURIComponent(e)
        };
        return p(n, r, o)
    }, u.prototype.getUserPlaylists = function(e, r, o) {
        var n;
        return "string" == typeof e ? n = {
            url: t + "/users/" + encodeURIComponent(e) + "/playlists"
        } : (n = {
            url: t + "/me/playlists"
        }, o = r, r = e), p(n, r, o)
    }, u.prototype.getPlaylist = function(e, r, o) {
        return p({
            url: t + "/playlists/" + e
        }, r, o)
    }, u.prototype.getPlaylistTracks = function(e, r, o) {
        return p({
            url: t + "/playlists/" + e + "/tracks"
        }, r, o)
    }, u.prototype.getPlaylistCoverImage = function(e, r) {
        return p({
            url: t + "/playlists/" + e + "/images"
        }, r)
    }, u.prototype.createPlaylist = function(e, r, o) {
        var n = {
            url: t + "/users/" + encodeURIComponent(e) + "/playlists",
            type: "POST",
            postData: r
        };
        return p(n, r, o)
    }, u.prototype.changePlaylistDetails = function(e, r, o) {
        return p({
            url: t + "/playlists/" + e,
            type: "PUT",
            postData: r
        }, r, o)
    }, u.prototype.addTracksToPlaylist = function(e, r, o, n) {
        return p({
            url: t + "/playlists/" + e + "/tracks",
            type: "POST",
            postData: {
                uris: r
            }
        }, o, n, !0)
    }, u.prototype.replaceTracksInPlaylist = function(e, r, o) {
        return p({
            url: t + "/playlists/" + e + "/tracks",
            type: "PUT",
            postData: {
                uris: r
            }
        }, {}, o)
    }, u.prototype.reorderTracksInPlaylist = function(e, r, o, n, s) {
        return p({
            url: t + "/playlists/" + e + "/tracks",
            type: "PUT",
            postData: {
                range_start: r,
                insert_before: o
            }
        }, n, s)
    }, u.prototype.removeTracksFromPlaylist = function(e, r, o) {
        var n;
        return p({
            url: t + "/playlists/" + e + "/tracks",
            type: "DELETE",
            postData: {
                tracks: r.map(function(t) {
                    return "string" == typeof t ? {
                        uri: t
                    } : t
                })
            }
        }, {}, o)
    }, u.prototype.removeTracksFromPlaylistWithSnapshotId = function(e, r, o, n) {
        var s;
        return p({
            url: t + "/playlists/" + e + "/tracks",
            type: "DELETE",
            postData: {
                tracks: r.map(function(t) {
                    return "string" == typeof t ? {
                        uri: t
                    } : t
                }),
                snapshot_id: o
            }
        }, {}, n)
    }, u.prototype.removeTracksFromPlaylistInPositions = function(e, r, o, n) {
        return p({
            url: t + "/playlists/" + e + "/tracks",
            type: "DELETE",
            postData: {
                positions: r,
                snapshot_id: o
            }
        }, {}, n)
    }, u.prototype.uploadCustomPlaylistCoverImage = function(e, r, o) {
        return p({
            url: t + "/playlists/" + e + "/images",
            type: "PUT",
            postData: r.replace(/^data:image\/jpeg;base64,/, ""),
            contentType: "image/jpeg"
        }, {}, o)
    }, u.prototype.getAlbum = function(e, r, o) {
        return p({
            url: t + "/albums/" + e
        }, r, o)
    }, u.prototype.getAlbumTracks = function(e, r, o) {
        return p({
            url: t + "/albums/" + e + "/tracks"
        }, r, o)
    }, u.prototype.getAlbums = function(e, r, o) {
        return p({
            url: t + "/albums/",
            params: {
                ids: e.join(",")
            }
        }, r, o)
    }, u.prototype.getTrack = function(e, r, o) {
        var n = {};
        return n.url = t + "/tracks/" + e, p(n, r, o)
    }, u.prototype.getTracks = function(e, r, o) {
        return p({
            url: t + "/tracks/",
            params: {
                ids: e.join(",")
            }
        }, r, o)
    }, u.prototype.getArtist = function(e, r, o) {
        return p({
            url: t + "/artists/" + e
        }, r, o)
    }, u.prototype.getArtists = function(e, r, o) {
        return p({
            url: t + "/artists/",
            params: {
                ids: e.join(",")
            }
        }, r, o)
    }, u.prototype.getArtistAlbums = function(e, r, o) {
        return p({
            url: t + "/artists/" + e + "/albums"
        }, r, o)
    }, u.prototype.getArtistTopTracks = function(e, r, o, n) {
        return p({
            url: t + "/artists/" + e + "/top-tracks",
            params: {
                country: r
            }
        }, o, n)
    }, u.prototype.getArtistRelatedArtists = function(e, r, o) {
        return p({
            url: t + "/artists/" + e + "/related-artists"
        }, r, o)
    }, u.prototype.getFeaturedPlaylists = function(e, r) {
        return p({
            url: t + "/browse/featured-playlists"
        }, e, r)
    }, u.prototype.getNewReleases = function(e, r) {
        return p({
            url: t + "/browse/new-releases"
        }, e, r)
    }, u.prototype.getCategories = function(e, r) {
        return p({
            url: t + "/browse/categories"
        }, e, r)
    }, u.prototype.getCategory = function(e, r, o) {
        return p({
            url: t + "/browse/categories/" + e
        }, r, o)
    }, u.prototype.getCategoryPlaylists = function(e, r, o) {
        return p({
            url: t + "/browse/categories/" + e + "/playlists"
        }, r, o)
    }, u.prototype.search = function(e, r, o, n) {
        return p({
            url: t + "/search/",
            params: {
                q: e,
                type: r.join(",")
            }
        }, o, n)
    }, u.prototype.searchAlbums = function(t, e, r) {
        return this.search(t, ["album"], e, r)
    }, u.prototype.searchArtists = function(t, e, r) {
        return this.search(t, ["artist"], e, r)
    }, u.prototype.searchTracks = function(t, e, r) {
        return this.search(t, ["track"], e, r)
    }, u.prototype.searchPlaylists = function(t, e, r) {
        return this.search(t, ["playlist"], e, r)
    }, u.prototype.searchShows = function(t, e, r) {
        return this.search(t, ["show"], e, r)
    }, u.prototype.searchEpisodes = function(t, e, r) {
        return this.search(t, ["episode"], e, r)
    }, u.prototype.getAudioFeaturesForTrack = function(e, r) {
        var o = {};
        return o.url = t + "/audio-features/" + e, p(o, {}, r)
    }, u.prototype.getAudioFeaturesForTracks = function(e, r) {
        return p({
            url: t + "/audio-features",
            params: {
                ids: e
            }
        }, {}, r)
    }, u.prototype.getAudioAnalysisForTrack = function(e, r) {
        var o = {};
        return o.url = t + "/audio-analysis/" + e, p(o, {}, r)
    }, u.prototype.getRecommendations = function(e, r) {
        return p({
            url: t + "/recommendations"
        }, e, r)
    }, u.prototype.getAvailableGenreSeeds = function(e) {
        return p({
            url: t + "/recommendations/available-genre-seeds"
        }, {}, e)
    }, u.prototype.getMyDevices = function(e) {
        return p({
            url: t + "/me/player/devices"
        }, {}, e)
    }, u.prototype.getMyCurrentPlaybackState = function(e, r) {
        return p({
            url: t + "/me/player"
        }, e, r)
    }, u.prototype.getMyCurrentPlayingTrack = function(e, r) {
        return p({
            url: t + "/me/player/currently-playing"
        }, e, r)
    }, u.prototype.transferMyPlayback = function(e, r, o) {
        var n = r || {};
        return n.device_ids = e, p({
            type: "PUT",
            url: t + "/me/player",
            postData: n
        }, r, o)
    }, u.prototype.play = function(e, r) {
        var o = "device_id" in (e = e || {}) ? {
                device_id: e.device_id
            } : null,
            n = {};
        return ["context_uri", "uris", "offset", "position_ms"].forEach(function(t) {
            t in e && (n[t] = e[t])
        }), p({
            type: "PUT",
            url: t + "/me/player/play",
            params: o,
            postData: n
        }, "function" == typeof e ? e : {}, r)
    }, u.prototype.queue = function(e, r, o) {
        var n;
        return p({
            type: "POST",
            url: t + "/me/player/queue",
            params: "device_id" in (r = r || {}) ? {
                uri: e,
                device_id: r.device_id
            } : {
                uri: e
            }
        }, r, o)
    }, u.prototype.pause = function(e, r) {
        var o;
        return p({
            type: "PUT",
            url: t + "/me/player/pause",
            params: "device_id" in (e = e || {}) ? {
                device_id: e.device_id
            } : null
        }, e, r)
    }, u.prototype.skipToNext = function(e, r) {
        var o;
        return p({
            type: "POST",
            url: t + "/me/player/next",
            params: "device_id" in (e = e || {}) ? {
                device_id: e.device_id
            } : null
        }, e, r)
    }, u.prototype.skipToPrevious = function(e, r) {
        var o;
        return p({
            type: "POST",
            url: t + "/me/player/previous",
            params: "device_id" in (e = e || {}) ? {
                device_id: e.device_id
            } : null
        }, e, r)
    }, u.prototype.seek = function(e, r, o) {
        var n = {
            position_ms: e
        };
        return "device_id" in (r = r || {}) && (n.device_id = r.device_id), p({
            type: "PUT",
            url: t + "/me/player/seek",
            params: n
        }, r, o)
    }, u.prototype.setRepeat = function(e, r, o) {
        var n = {
            state: e
        };
        return "device_id" in (r = r || {}) && (n.device_id = r.device_id), p({
            type: "PUT",
            url: t + "/me/player/repeat",
            params: n
        }, r, o)
    }, u.prototype.setVolume = function(e, r, o) {
        var n = {
            volume_percent: e
        };
        return "device_id" in (r = r || {}) && (n.device_id = r.device_id), p({
            type: "PUT",
            url: t + "/me/player/volume",
            params: n
        }, r, o)
    }, u.prototype.setShuffle = function(e, r, o) {
        var n = {
            state: e
        };
        return "device_id" in (r = r || {}) && (n.device_id = r.device_id), p({
            type: "PUT",
            url: t + "/me/player/shuffle",
            params: n
        }, r, o)
    }, u.prototype.getShow = function(e, r, o) {
        var n = {};
        return n.url = t + "/shows/" + e, p(n, r, o)
    }, u.prototype.getShows = function(e, r, o) {
        return p({
            url: t + "/shows/",
            params: {
                ids: e.join(",")
            }
        }, r, o)
    }, u.prototype.getMySavedShows = function(e, r) {
        return p({
            url: t + "/me/shows"
        }, e, r)
    }, u.prototype.addToMySavedShows = function(e, r, o) {
        return p({
            url: t + "/me/shows",
            type: "PUT",
            postData: e
        }, r, o)
    }, u.prototype.removeFromMySavedShows = function(e, r, o) {
        return p({
            url: t + "/me/shows",
            type: "DELETE",
            postData: e
        }, r, o)
    }, u.prototype.containsMySavedShows = function(e, r, o) {
        return p({
            url: t + "/me/shows/contains",
            params: {
                ids: e.join(",")
            }
        }, r, o)
    }, u.prototype.getShowEpisodes = function(e, r, o) {
        return p({
            url: t + "/shows/" + e + "/episodes"
        }, r, o)
    }, u.prototype.getEpisode = function(e, r, o) {
        var n = {};
        return n.url = t + "/episodes/" + e, p(n, r, o)
    }, u.prototype.getEpisodes = function(e, r, o) {
        return p({
            url: t + "/episodes/",
            params: {
                ids: e.join(",")
            }
        }, r, o)
    }, u.prototype.getAccessToken = function() {
        return e
    }, u.prototype.setAccessToken = function(t) {
        e = t
    }, u.prototype.setPromiseImplementation = function(t) {
        var e = !1;
        try {
            var o = new t(function(t) {
                t()
            });
            "function" == typeof o.then && "function" == typeof o.catch && (e = !0)
        } catch (n) {
            console.error(n)
        }
        if (e) r = t;
        else throw Error("Unsupported implementation of Promises/A+")
    }, u
}();
"object" == typeof module && "object" == typeof module.exports && (module.exports = SpotifyWebApi);