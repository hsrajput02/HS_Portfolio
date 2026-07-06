import { useEffect, useState } from "react";

import AdminForm from "./common/AdminForm";
import Notification from "../common/Notification";
import useNotification from "../../hooks/useNotification";

import { uploadFile } from "../../services/uploadService";

import {
    getSettings,
    updateSettings,
} from "../../services/settingsService";

function SettingsForm() {

    const [heroImageFile, setHeroImageFile] = useState(null);
    const [settings, setSettings] = useState({

        name: "",

        heroTitles: [],

        tagline: "",

        about: "",

        email: "",

        phone: "",

        location: "",

        whatsapp: "",

        github: "",

        linkedin: "",

        instagram: "",

        resume: "",

        heroImage: "",



    });

    const [resumeFile, setResumeFile] = useState(null);

    const [newTitle, setNewTitle] = useState("");

    const [loading, setLoading] = useState(false);

    const {
        notification,
        showNotification,
    } = useNotification();

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        try {

            const res = await getSettings();

            setSettings({

                heroBadge: "",

                name: "",

                heroTitles: [],

                tagline: "",

                footerTagline: "",

                about: "",

                email: "",

                phone: "",

                location: "",

                whatsapp: "",

                github: "",

                linkedin: "",

                instagram: "",

                resume: "",

                heroImage: "",

                ...res.data.data,

            });

        }

        catch (error) {

            console.error(error);

        }

    };

    const handleChange = (e) => {

        setSettings({

            ...settings,

            [e.target.name]: e.target.value,

        });

    };

    const addHeroTitle = () => {

        if (!newTitle.trim()) return;

        if ((settings.heroTitles || []).includes(newTitle.trim())) return;

        setSettings({

            ...settings,

            heroTitles: [

                ...(settings.heroTitles || []),

                newTitle.trim(),

            ],

        });

        setNewTitle("");

    };

    const removeHeroTitle = (index) => {

        setSettings({

            ...settings,

            heroTitles: (settings.heroTitles || []).filter(

                (_, i) => i !== index

            ),

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            // Resume Upload
            let resumeUrl = settings.resume;

            if (resumeFile) {

                const uploadResponse = await uploadFile(resumeFile);

                resumeUrl = uploadResponse.fileUrl;

            }

            // Hero Image Upload
            let heroImageUrl = settings.heroImage;

            if (heroImageFile) {

                const uploadResponse = await uploadFile(heroImageFile);

                heroImageUrl = uploadResponse.fileUrl;

            }

            // Save Settings
            await updateSettings({

                ...settings,

                resume: resumeUrl,

                heroImage: heroImageUrl,



            });

            showNotification(
                "Settings updated successfully!",
                "success"
            );

            loadSettings();

        }

        catch (error) {

            console.error(error);

            showNotification(
                "Failed to update settings.",
                "error"
            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            <AdminForm

                title="Portfolio Settings"

                onSubmit={handleSubmit}

                buttonText="Save Settings"

                loading={loading}

                loadingText="Saving Settings..."

            >

                <label className="formLabel">
                    Name
                </label>
                <input
                    name="name"
                    placeholder="Name"
                    value={settings.name || ""}
                    onChange={handleChange}
                />
                <label className="formLabel">
                    Home Badge
                </label>
                <input
                    name="heroBadge"
                    placeholder="Hero Badge"
                    value={settings.heroBadge || ""}
                    onChange={handleChange}
                />


                {/*   Hero Titles   */}

                <div>

                    <label className="formLabel">
                        Home Titles
                    </label>
                    {

                        settings.heroTitles?.map((title, index) => (

                            <div

                                key={index}

                                style={{

                                    display: "flex",

                                    alignItems: "center",

                                    justifyContent: "space-between",

                                    background: "#111827",

                                    border: "1px solid #374151",

                                    borderRadius: "10px",

                                    padding: "12px 16px",

                                    marginBottom: "10px",

                                }}

                            >

                                <span>

                                    {title}

                                </span>

                                <button

                                    type="button"

                                    onClick={() => removeHeroTitle(index)}

                                    style={{

                                        background: "#ef4444",

                                        color: "white",

                                        border: "none",

                                        borderRadius: "8px",

                                        padding: "6px 12px",

                                        cursor: "pointer",

                                    }}

                                >

                                    Remove

                                </button>

                            </div>

                        ))

                    }

                    <div

                        style={{

                            display: "flex",

                            gap: "12px",

                            marginTop: "15px",

                        }}

                    >


                        <input

                            type="text"

                            placeholder="Add New Hero Title"

                            value={newTitle}

                            onChange={(e) =>

                                setNewTitle(e.target.value)

                            }

                            style={{

                                flex: 1,

                            }}

                        />

                        <button

                            type="button"

                            onClick={addHeroTitle}

                            style={{

                                background: "#7c3aed",
                                color: "white",
                                border: "none",
                                borderRadius: "10px",
                                padding: "0 22px",
                                cursor: "pointer",
                                whiteSpace: "nowrap",

                            }}
                        >  Add </button>

                    </div>

                </div>

                <label className="formLabel">
                    Tagline
                </label>
                <input
                    name="tagline"
                    placeholder="Tagline"
                    value={settings.tagline || ""}
                    onChange={handleChange}
                />


                <label className="formLabel">
                    Footer Tagline
                </label>

                <input
                    name="footerTagline"
                    placeholder="Footer Tagline"
                    value={settings.footerTagline || ""}
                    onChange={handleChange}
                />

                <label className="formLabel">
                    About
                </label>

                <textarea
                    name="about"
                    placeholder="About"
                    value={settings.about || ""}
                    onChange={handleChange}
                />

                <label className="formLabel">
                    Email
                </label>
                <input
                    name="email"
                    placeholder="Email"
                    value={settings.email || ""}
                    onChange={handleChange}
                />

                <label className="formLabel">
                    Phone
                </label>
                <input
                    name="phone"
                    placeholder="Phone"
                    value={settings.phone || ""}
                    onChange={handleChange}
                />

                <label className="formLabel">
                    Location
                </label>
                <input
                    name="location"
                    placeholder="Location"
                    value={settings.location || ""}
                    onChange={handleChange}
                />

                <label className="formLabel">
                    WhatsApp Number
                </label>
                <input
                    name="whatsapp"
                    placeholder="WhatsApp Number"
                    value={settings.whatsapp || ""}
                    onChange={handleChange}
                />

                <label className="formLabel">
                    GitHub URL
                </label>
                <input
                    name="github"
                    placeholder="GitHub URL"
                    value={settings.github || ""}
                    onChange={handleChange}
                />

                <label className="formLabel">
                    LinkedIn URL
                </label>
                <input
                    name="linkedin"
                    placeholder="LinkedIn URL"
                    value={settings.linkedin || ""}
                    onChange={handleChange}
                />

                <label className="formLabel">
                    Instagram URL
                </label>
                <input
                    name="instagram"
                    placeholder="Instagram URL"
                    value={settings.instagram || ""}
                    onChange={handleChange}
                />

                <div>

                    <label
                        style={{
                            color: "white",
                            display: "block",
                            marginBottom: "8px",
                        }}
                    >

                        Resume (PDF)

                    </label>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) =>
                            setResumeFile(e.target.files[0])
                        }
                    />

                    {settings.resume && (

                        <p
                            style={{
                                color: "#8b5cf6",
                                marginTop: "10px",
                            }}
                        >

                            Current Resume:&nbsp;

                            <a
                                href={settings.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                            >

                                View Resume

                            </a>

                        </p>

                    )}

                </div>

                <div>

                    <label
                        style={{
                            color: "white",
                            display: "block",
                            marginBottom: "8px",
                        }}
                    >

                        Hero / Profile Image

                    </label>

                    <input

                        type="file"

                        accept="image/*"

                        onChange={(e) =>
                            setHeroImageFile(e.target.files[0])
                        }

                    />

                    {

                        settings.heroImage && (

                            <div
                                style={{
                                    marginTop: "15px",
                                }}
                            >

                                <p
                                    style={{
                                        color: "#8b5cf6",
                                        marginBottom: "10px",
                                    }}
                                >

                                    Current Image

                                </p>

                                <img

                                    src={settings.heroImage}

                                    alt="Hero"

                                    style={{

                                        width: "160px",

                                        borderRadius: "12px",

                                        border: "2px solid #444",

                                    }}

                                />

                            </div>

                        )

                    }

                </div>

            </AdminForm>

            <Notification
                visible={notification.visible}
                message={notification.message}
                type={notification.type}
            />

        </>

    );

}

export default SettingsForm;