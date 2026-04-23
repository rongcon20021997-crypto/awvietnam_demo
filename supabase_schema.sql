-- 1. Table for Technicians (Users)
CREATE TABLE technicians (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT UNIQUE NOT NULL,
    region TEXT,
    role TEXT CHECK (role IN ('technician', 'dealer')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected', 'flagged')),
    cccd_url TEXT,
    points INTEGER DEFAULT 0,
    total_earned BIGINT DEFAULT 0,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table for Installations
CREATE TABLE installations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    technician_id UUID REFERENCES technicians(id),
    serial_number TEXT UNIQUE NOT NULL,
    model TEXT NOT NULL,
    customer_name TEXT,
    customer_phone TEXT,
    address TEXT,
    region TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('approved', 'pending', 'rejected')),
    points INTEGER DEFAULT 0,
    photo_urls TEXT[], -- Array of image URLs
    gps_valid BOOLEAN DEFAULT TRUE,
    ai_score INTEGER,
    installed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reject_reason TEXT
);

-- 3. Table for Reward Requests
CREATE TABLE reward_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    technician_id UUID REFERENCES technicians(id),
    type TEXT CHECK (type IN ('cash', 'gift')),
    amount BIGINT DEFAULT 0,
    points INTEGER NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid')),
    bank_account TEXT,
    gift_item TEXT,
    requested_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Sample Data
INSERT INTO technicians (name, phone, region, role, status, points, total_earned)
VALUES ('Nguyễn Văn Tuấn', '0901234567', 'TP.HCM', 'technician', 'approved', 1250, 3500000);
